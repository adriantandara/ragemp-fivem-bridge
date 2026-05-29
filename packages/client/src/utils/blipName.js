export function applyBlipName(handle, name) {
  if (handle == null || name == null || name === "") return;
  const text = String(name);
  BeginTextCommandSetBlipName("STRING");
  AddTextComponentSubstringPlayerName(text);
  EndTextCommandSetBlipName(handle);
}
