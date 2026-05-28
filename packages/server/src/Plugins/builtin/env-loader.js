export const name = "env-loader";

export default function setup({ mp, plugin }) {
  const fs = require("fs");
  const path = require("path");

  function parseEnvFile(content) {
    const env = {};
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

  function loadEnvForResource(resourceName) {
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

  const numResources = GetNumResources();
  for (let i = 0; i < numResources; i++) {
    const resName = GetResourceByFindIndex(i);
    if (resName) loadEnvForResource(resName);
  }

  mp.environment = {
    loadEnv(resourceName) {
      return loadEnvForResource(resourceName ?? GetCurrentResourceName());
    },
  };
}
