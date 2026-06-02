export const name = "env-loader";

interface PluginContext {
  name: string;
  resource: string;
  builtin: boolean;
  namespace(eventName: string): string;
  log(...args: any[]): void;
}

export default function setup({ mp, plugin }: { mp: any; plugin: PluginContext }): void {
  const fs = require("fs");
  const path = require("path");

  function parseEnvFile(content: string): Record<string, string> {
    const env: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
    return env;
  }

  function loadEnvForResource(resourceName: string): number {
    try {
      const resPath = GetResourcePath(resourceName);
      if (!resPath) return 0;
      const envPath = path.join(resPath, ".env");
      if (!fs.existsSync(envPath)) return 0;
      const content = fs.readFileSync(envPath, "utf8");
      const vars = parseEnvFile(content);
      let count = 0;
      for (const [key, value] of Object.entries(vars)) {
        if (process.env[key] === undefined) {
          process.env[key] = value;
          count++;
        }
      }
      return count;
    } catch {
      return 0;
    }
  }

  loadEnvForResource(GetCurrentResourceName());

  mp.environment = {
    loadEnv(resourceName?: string): number {
      return loadEnvForResource(resourceName ?? GetCurrentResourceName());
    },
  };
}
