export class PluginManager {
  _plugins = new Map();
  _builtins = [];

  constructor(config) {
    if (!config || !config.side) throw new Error("PluginManager: { side, scriptKey, resourceStartEvent } required");
    this._side = config.side;
    this._scriptKey = config.scriptKey;
    this._resourceStartEvent = config.resourceStartEvent;
    this._contextExtras = config.contextExtras ?? (() => ({}));
  }

  registerBuiltin(setupModule) {
    this._builtins.push(setupModule);
  }

  loadAll() {
    this._disabled = this._readDisabled();
    if (this._disabled.size) {
      console.log(`[bridge:plugins] disabled: ${[...this._disabled].join(", ")}`);
    }
    for (const mod of this._builtins) {
      if (this._disabled.has(mod.name)) continue;
      this._invoke(mod.name, GetCurrentResourceName(), mod.default, { builtin: true });
    }
    this._scanExternal();
    if (this._resourceStartEvent) {
      on(this._resourceStartEvent, (resource) => this._tryLoadResource(resource));
    }
  }

  _readDisabled() {
    const disabled = new Set();
    const readFrom = (res) => {
      if (!res) return;
      const count = GetNumResourceMetadata(res, "disable_plugin");
      for (let i = 0; i < count; i++) {
        const value = GetResourceMetadata(res, "disable_plugin", i);
        if (value) disabled.add(value.trim());
      }
    };
    readFrom(GetCurrentResourceName());
    const total = GetNumResources();
    for (let i = 0; i < total; i++) {
      const res = GetResourceByFindIndex(i);
      if (res && GetResourceMetadata(res, "ragemp_bridge", 0) === "library") {
        readFrom(res);
      }
    }
    return disabled;
  }

  _scanExternal() {
    const count = GetNumResources();
    for (let i = 0; i < count; i++) {
      const res = GetResourceByFindIndex(i);
      if (!res) continue;
      if (GetResourceState(res) !== "started") continue;
      this._tryLoadResource(res);
    }
  }

  _tryLoadResource(resource) {
    if (resource === GetCurrentResourceName()) return;
    if (GetResourceMetadata(resource, "bridge_plugin", 0) !== "yes") return;
    const entry = GetResourceMetadata(resource, this._scriptKey, 0);
    if (!entry) return;
    const code = LoadResourceFile(resource, entry);
    if (!code) {
      console.warn(`[bridge:plugins] Cannot read ${entry} from resource '${resource}'`);
      return;
    }
    const name = GetResourceMetadata(resource, "bridge_plugin_name", 0) || resource;
    if (this._disabled?.has(name)) return;
    if (this._plugins.has(name)) return;
    try {
      const fn = new Function("mp", "plugin", code);
      this._invoke(name, resource, (api) => fn(api.mp, api.plugin), { builtin: false });
    } catch (err) {
      console.error(`[bridge:plugins] Failed to load '${name}' from '${resource}':`, err);
    }
  }

  _invoke(name, resource, setupFn, meta) {
    const mp = globalThis.mp;
    const plugin = this._makeContext(name, resource, meta.builtin);
    this._plugins.set(name, plugin);
    try {
      setupFn({ mp, plugin });
      plugin.log(`loaded (${meta.builtin ? "built-in" : "external"})`);
    } catch (err) {
      console.error(`[bridge:plugins] Setup of '${name}' threw:`, err);
      this._plugins.delete(name);
    }
  }

  _makeContext(name, resource, builtin) {
    const base = {
      name,
      resource,
      builtin,
      namespace(eventName) { return `${name}:${eventName}`; },
      log(...args) { console.log(`[plugin:${name}]`, ...args); },
    };
    return Object.assign(base, this._contextExtras(name, resource) ?? {});
  }

  list() { return [...this._plugins.values()]; }
  get(name) { return this._plugins.get(name) ?? null; }
  has(name) { return this._plugins.has(name); }
}
