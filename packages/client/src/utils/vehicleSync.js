export const vehicleAppliers = {
  engine: (h, v) => SetVehicleEngineOn(h, v, false, false),
  livery: (h, v) => SetVehicleLivery(h, v),
  numberPlateType: (h, v) => SetVehicleNumberPlateTextIndex(h, v),
  windowTint: (h, v) => SetVehicleWindowTint(h, v),
  wheelType: (h, v) => SetVehicleWheelType(h, v),
  alpha: (h, v) => SetEntityAlpha(h, v, false),
  engineHealth: (h, v) => SetVehicleEngineHealth(h, v),
  dashboardColor: (h, v) => SetVehicleDashboardColour(h, v),
  taxiLights: (h, v) => SetTaxiLights(h, v),
  trimColor: (h, v) => SetVehicleInteriorColour(h, v),
  neonEnabled: (h, v) => {
    for (let i = 0; i < 4; i++) SetVehicleNeonLightEnabled(h, i, v);
  },
  customTires: (h, v) => {
    SetVehicleModKit(h, 0);
    ToggleVehicleMod(h, 18, v);
  },
  pearlescentColor: (h, v) => {
    const [, wheelCol] = GetVehicleExtraColours(h);
    SetVehicleExtraColours(h, v, wheelCol);
  },
  wheelColor: (h, v) => {
    const [pearlCol] = GetVehicleExtraColours(h);
    SetVehicleExtraColours(h, pearlCol, v);
  },
  neonColor: (h, value) => {
    const [r, g, b] = value;
    SetVehicleNeonLightsColour(h, r, g, b);
  },
};

export function applyVehicleProp(handle, key, value) {
  const fn = vehicleAppliers[key];
  if (fn) fn(handle, value);
}

export function applyVehicleMod(handle, modType, modIndex) {
  SetVehicleModKit(handle, 0);
  SetVehicleMod(handle, modType, modIndex, false);
}

export function applyVehicleExtra(handle, extraId, state) {
  SetVehicleExtra(handle, extraId, !state);
}

export function applyVehicleRepair(handle) {
  SetVehicleFixed(handle);
  SetVehicleEngineHealth(handle, 1000.0);
  SetVehicleBodyHealth(handle, 1000.0);
}

export function applyVehicleSnapshot(handle, snap) {
  if (!handle || !snap) return;

  for (const key of Object.keys(vehicleAppliers)) {
    if (snap[key] !== undefined && snap[key] !== null) {
      vehicleAppliers[key](handle, snap[key]);
    }
  }

  if (snap.mods) {
    for (const [modType, modIndex] of Object.entries(snap.mods)) {
      applyVehicleMod(handle, Number(modType), modIndex);
    }
  }

  if (snap.extras) {
    for (const [extraId, state] of Object.entries(snap.extras)) {
      applyVehicleExtra(handle, Number(extraId), state);
    }
  }

  if (snap.color) {
    SetVehicleColours(handle, snap.color.primary, snap.color.secondary);
  }

  if (snap.colorRGB) {
    const [[r1, g1, b1], [r2, g2, b2]] = snap.colorRGB;
    SetVehicleCustomPrimaryColour(handle, r1, g1, b1);
    SetVehicleCustomSecondaryColour(handle, r2, g2, b2);
  }

  if (snap.numberPlate !== undefined && snap.numberPlate !== null) {
    SetVehicleNumberPlateText(handle, snap.numberPlate);
  }

  if (snap.bodyHealth !== undefined && snap.bodyHealth !== null) {
    SetVehicleBodyHealth(handle, snap.bodyHealth);
  }

  if (snap.locked !== undefined && snap.locked !== null) {
    SetVehicleDoorsLocked(handle, snap.locked ? 2 : 1);
  }
}
