export class SystemMp {
  get version() {
    return GetGameBuildNumber();
  }

  get resourceName() {
    return GetCurrentResourceName();
  }

  notify(message: string) {
    SetNotificationTextEntry("STRING");
    AddTextComponentString(String(message ?? ""));
    DrawNotification(false, false);
  }

  get isFocused() {
    return typeof IsWindowFocused === "function" ? IsWindowFocused() : true;
  }
}
