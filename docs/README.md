# Documentation

A head-to-tail guide to running RAGE:MP JavaScript gamemodes on FiveM with the bridge.

## Start here

1. **[Concepts](01-concepts.md)** — how the bridge works and how a standalone setup fits
   together.
2. **[Server structure](02-server-structure.md)** — what a FiveM server using the bridge
   looks like on disk, where the bridge goes, and resource load order.

## Tutorials

3. **[Standalone tutorial](03-standalone-tutorial.md)** — set up the bridge as a shared
   resource and opt your gamemode in. No build step.

## Porting a RAGE:MP gamemode

5. **[From RAGE:MP files to FiveM](05-migrating-files.md)** — the important one: how
   `packages/<name>/` and `client_packages/` (with or without an `index.js` entrypoint)
   map onto a FiveM resource.

## Subsystems

6. **[NUI, browsers & chat](06-nui-and-chat.md)** — the host/iframe browser model,
   `mp.browsers`, the required `ui/` folder, and the `ragemp-chat` resource.
7. **[Plugins & roadmap features](07-plugins-and-features.md)** — built-in plugins
   (`vehicle-sync`, `spawnmanager`, `rage-rpc`), disabling them, `mp.prototype`, RPC,
   third-party plugins.

## Reference

8. **[Configuration & conventions](08-configuration.md)** — every non-optional rule in one
   place: fxmanifest layout, load order, the `ui/` requirement, `disable_plugin`, and a
   troubleshooting table. **Check here first when something won't load.**

## Examples

The [`examples/`](../examples/) folder has runnable references:

| Example | What it shows |
| --- | --- |
| [`showcase/`](../examples/showcase/) | One demo file per `mp.*` area + the four roadmap features. |
| [`ragemp-chat/`](../examples/ragemp-chat/) | A RAGE:MP-style chat resource for `mp.gui.chat` + commands. |
