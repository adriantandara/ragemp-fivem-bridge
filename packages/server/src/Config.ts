export class ConfigMp {
  get name(): string {
    return GetConvar("sv_hostname", "FiveM Server");
  }

  get maxplayers(): number {
    return GetConvarInt("sv_maxclients", 32);
  }

  get gamemode(): string {
    return GetConvar("gametype", "");
  }

  get port(): number {
    return GetConvarInt("sv_endpointPort", 30120);
  }

  get bind(): string {
    return GetConvar("sv_endpointAddress", "0.0.0.0");
  }

  get announce(): boolean {
    return GetConvar("sv_master1", "") !== "";
  }

  get map(): string {
    return GetConvar("mapname", "");
  }

  get language(): string {
    return GetConvar("locale", "en");
  }
}
