import { createUnkProxy } from "./_helpers.js";

export class GamePadNs {
  unk = createUnkProxy();

  useDefaultVehicleEntering = true;

  isControlEnabled(padIndex, control) { return IsControlEnabled(padIndex, control); }
  isControlPressed(padIndex, control) { return IsControlPressed(padIndex, control); }
  isControlReleased(padIndex, control) { return IsControlReleased(padIndex, control); }
  isControlJustPressed(padIndex, control) { return IsControlJustPressed(padIndex, control); }
  isControlJustReleased(padIndex, control) { return IsControlJustReleased(padIndex, control); }

  getControlValue(padIndex, control) { return GetControlValue(padIndex, control); }
  getControlNormal(padIndex, control) { return GetControlNormal(padIndex, control); }
  getControlUnboundNormal(padIndex, control) { return GetControlUnboundNormal(padIndex, control); }
  setControlNormal(padIndex, control, amount) { return SetControlNormal(padIndex, control, amount); }

  isDisabledControlPressed(padIndex, control) { return IsDisabledControlPressed(padIndex, control); }
  isDisabledControlReleased(padIndex, control) { return IsDisabledControlReleased(padIndex, control); }
  isDisabledControlJustPressed(padIndex, control) { return IsDisabledControlJustPressed(padIndex, control); }
  isDisabledControlJustReleased(padIndex, control) { return IsDisabledControlJustReleased(padIndex, control); }
  getDisabledControlNormal(padIndex, control) { return GetDisabledControlNormal(padIndex, control); }
  getDisabledControlUnboundNormal(padIndex, control) { return GetDisabledControlUnboundNormal(padIndex, control); }

  disableControlAction(padIndex, control, disable) { DisableControlAction(padIndex, control, disable); }
  enableControlAction(padIndex, control, enable) { EnableControlAction(padIndex, control, enable); }
  disableAllControlActions(padIndex) { DisableAllControlActions(padIndex); }
  enableAllControlActions(padIndex) { EnableAllControlActions(padIndex); }

  setDisableControlActionBatch(isMoveOrLook, controlActions) {
    if (!Array.isArray(controlActions)) return;
    this._batchedDisables = { isMoveOrLook, controlActions };
  }

  isInputDisabled(padIndex) { return IsInputDisabled(padIndex); }
  isUsingKeyboard(padIndex) { return IsUsingKeyboard(padIndex); }
  isLookInverted() { return IsLookInverted(); }
  
  getControlActionName(inputGroup, control, includeDeviceName) {
    return Citizen.invokeNative('0x8290252FFF36ACB5', Citizen.resultAsString(), inputGroup, control, includeDeviceName ?? true);
  }
}
