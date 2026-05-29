export class ConfigMp {
  get name() {
    return GetConvar("sv_hostname", "FiveM Server");
  }

  get maxplayers() {
    return GetConvarInt("sv_maxclients", 32);
  }

  get gamemode() {
    return GetConvar("gametype", "");
  }

  get port() {
    return GetConvarInt("sv_endpointPort", 30120);
  }

  get bind() {
    return GetConvar("sv_endpointAddress", "0.0.0.0");
  }

  get announce() {
    return GetConvar("sv_master1", "") !== "";
  }

  get map() {
    return GetConvar("mapname", "");
  }

  get language() {
    return GetConvar("locale", "en");
  }

  get security() {
    const list = GetConvar("ragemp_rpc_allowlist", "").trim();
    return {
      allowRemoteEval: GetConvarInt("ragemp_allow_remote_eval", 0) === 1,
      allowRemoteInvoke: GetConvarInt("ragemp_allow_remote_invoke", 0) === 1,
      rpcAllowlist: list ? list.split(/[,\s]+/).filter(Boolean) : null,
      ingressRateLimit: GetConvarInt("ragemp_ingress_rate_limit", 100),
    };
  }
}
