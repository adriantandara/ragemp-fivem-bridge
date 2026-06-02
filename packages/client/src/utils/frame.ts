let _pedFrame = -1;
let _ped = 0;

let _coordsFrame = -1;
let _coords: number[] = [0, 0, 0];

export function framePlayerPed(): number {
  const f = GetFrameCount();
  if (f !== _pedFrame) {
    _ped = PlayerPedId();
    _pedFrame = f;
  }
  return _ped;
}

export function framePlayerCoords(): number[] {
  const f = GetFrameCount();
  if (f !== _coordsFrame) {
    _coords = GetEntityCoords(framePlayerPed(), true);
    _coordsFrame = f;
  }
  return _coords;
}