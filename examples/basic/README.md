# basic

Built with [ragemp-fivem-bridge](https://github.com/your-org/ragemp-fivem-bridge).

## Develop

```bash
npx mp-fivem build --watch
```

## Build for production

```bash
npx mp-fivem build
```

The output goes to `dist/basic/`. Drop that folder into your FiveM server's `resources/` directory and add `ensure basic` to your `server.cfg`.
