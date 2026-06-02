import { createUnkProxy } from "./_helpers.js";

export class GamePadNs {
  unk = createUnkProxy();
  _batchedDisables: { isMoveOrLook: boolean; controlActions: number[] } | undefined;

  useDefaultVehicleEntering: boolean = true;

  isControlEnabled(padIndex: number, control: number): boolean { return IsControlEnabled(padIndex, control); }
  isControlPressed(padIndex: number, control: number): boolean { return IsControlPressed(padIndex, control); }
  isControlReleased(padIndex: number, control: number): boolean { return IsControlReleased(padIndex, control); }
  isControlJustPressed(padIndex: number, control: number): boolean { return IsControlJustPressed(padIndex, control); }
  isControlJustReleased(padIndex: number, control: number): boolean { return IsControlJustReleased(padIndex, control); }

  getControlValue(padIndex: number, control: number): number { return GetControlValue(padIndex, control); }
  getControlNormal(padIndex: number, control: number): number { return GetControlNormal(padIndex, control); }
  getControlUnboundNormal(padIndex: number, control: number): number { return GetControlUnboundNormal(padIndex, control); }
  setControlNormal(padIndex: number, control: number, amount: number): boolean { return SetControlNormal(padIndex, control, amount); }

  isDisabledControlPressed(padIndex: number, control: number): boolean { return IsDisabledControlPressed(padIndex, control); }
  isDisabledControlReleased(padIndex: number, control: number): boolean { return IsDisabledControlReleased(padIndex, control); }
  isDisabledControlJustPressed(padIndex: number, control: number): boolean { return IsDisabledControlJustPressed(padIndex, control); }
  isDisabledControlJustReleased(padIndex: number, control: number): boolean { return IsDisabledControlJustReleased(padIndex, control); }
  getDisabledControlNormal(padIndex: number, control: number): number { return GetDisabledControlNormal(padIndex, control); }
  getDisabledControlUnboundNormal(padIndex: number, control: number): number { return GetDisabledControlUnboundNormal(padIndex, control); }

  disableControlAction(padIndex: number, control: number, disable: boolean): void { DisableControlAction(padIndex, control, disable); }
  enableControlAction(padIndex: number, control: number, enable: boolean): void { EnableControlAction(padIndex, control, enable); }
  disableAllControlActions(padIndex: number): void { DisableAllControlActions(padIndex); }
  enableAllControlActions(padIndex: number): void { EnableAllControlActions(padIndex); }

  setDisableControlActionBatch(isMoveOrLook: boolean, controlActions: number[]): void {
    if (!Array.isArray(controlActions)) return;
    this._batchedDisables = { isMoveOrLook, controlActions };
  }

  isInputDisabled(padIndex: number): boolean { return IsInputDisabled(padIndex); }
  isUsingKeyboard(padIndex: number): boolean { return IsUsingKeyboard(padIndex); }
  isLookInverted(): boolean { return IsLookInverted(); }

  setPlayerpadShakesWhenControllerDisabled(toggle: boolean): void { SetPlayerpadShakesWhenControllerDisabled(!!toggle); }
  setControlLightEffectColor(padIndex: number, red: number, green: number, blue: number): void { SetControlLightEffectColor(padIndex, red, green, blue); }
  setShake(padIndex: number, duration: number, frequency: number): void { Citizen.invokeNative("0x48B3886C1358D0D5", padIndex, duration, frequency); }
  stopShake(padIndex: number): void { Citizen.invokeNative("0x38C16A305E8CDC8D", padIndex); }
  getLocalPlayerAimState(): number { return GetLocalPlayerAimState(); }
  getIsUsingAlternateDriveby(): boolean { return GetIsUsingAlternateDriveby(); }
  getAllowMovementWhileZoomed(): boolean { return GetAllowMovementWhileZoomed(); }
  setInputExclusive(padIndex: number, control: number): void { SetInputExclusive(padIndex, control); }

  getControlActionName(inputGroup: number, control: number, includeDeviceName: boolean): string {
    return Citizen.invokeNative('0x8290252FFF36ACB5', Citizen.resultAsString(), inputGroup, control, includeDeviceName ?? true);
  }

  isInputJustDisabled(padIndex: number): boolean { return IsInputJustDisabled(padIndex); } // unverified
  setPadShake(padIndex: number, duration: number, frequency: number): void { Citizen.invokeNative("0x48B3886C1358D0D5", padIndex, duration, frequency); }
  stopPadShake(padIndex: number): void { Citizen.invokeNative("0x38C16A305E8CDC8D", padIndex); }
  isUsingKeyboard2(padIndex: number): boolean { return Citizen.invokeNative("0x13337B38DB572509", Citizen.resultAsInteger(), padIndex); }
  setCursorLocation(x: number, y: number): boolean { return SetCursorLocation(x, y); } // unverified
  getControlInstructionalButton(padIndex: number, control: number, p2: boolean): string {
    return Citizen.invokeNative('0x0499D7B09FC9B407', Citizen.resultAsString(), padIndex, control, p2 ?? true);
  }
  getControlGroupInstructionalButton(padIndex: number, controlGroup: number, p2: boolean): string {
    return Citizen.invokeNative('0x80C2FD58D720C801', Citizen.resultAsString(), padIndex, controlGroup, p2 ?? true);
  }
  getLocalPlayerAimState2(): number { return GetLocalPlayerGamepadAimState(); }
  setPlayerShakesWhenControllerDisabled(toggle: boolean): void { SetPlayerpadShakesWhenControllerDisabled(!!toggle); }
  switchToInputMappingScheme(name: string): boolean { return SwitchToInputMappingScheme(name); } // unverified
  switchToInputMappingScheme2(name: string): boolean { return SwitchToInputMappingScheme_2(name); } // unverified
  resetInputMappingScheme(): void { ResetInputMappingScheme(); } // unverified
  applyDisableControlActionBatch(): void {
    const batch = this._batchedDisables;
    if (!batch || !Array.isArray(batch.controlActions)) return;
    for (const control of batch.controlActions) DisableControlAction(0, control, true);
  }

  ["_0x5B73C77D9EB66E24"](...args: any[]): any { return Citizen.invokeNative("0x5B73C77D9EB66E24", ...args); }
  ["_0xD7D22F5592AED8BA"](...args: any[]): any { return Citizen.invokeNative("0xD7D22F5592AED8BA", ...args); }
  ["_0x23F09EADC01449D6"](...args: any[]): any { return Citizen.invokeNative("0x23F09EADC01449D6", ...args); }
  ["_0x6CD79468A1E595C6"](...args: any[]): any { return Citizen.invokeNative("0x6CD79468A1E595C6", ...args); }
  ["_0xCB0360EFEFB2580D"](...args: any[]): any { return Citizen.invokeNative("0xCB0360EFEFB2580D", ...args); }
  ["_0x14D29BB12D47F68C"](...args: any[]): any { return Citizen.invokeNative("0x14D29BB12D47F68C", ...args); }
  ["_0xF239400E16C23E08"](...args: any[]): any { return Citizen.invokeNative("0xF239400E16C23E08", ...args); }
  ["_0xA0CEFCEA390AAB9B"](...args: any[]): any { return Citizen.invokeNative("0xA0CEFCEA390AAB9B", ...args); }
  ["_0xE1615EC03B3BB4FD"](...args: any[]): any { return Citizen.invokeNative("0xE1615EC03B3BB4FD", ...args); }
  ["_0x25AAA32BDC98F2A3"](...args: any[]): any { return Citizen.invokeNative("0x25AAA32BDC98F2A3", ...args); }
  ["_0x7F4724035FDCA1DD"](...args: any[]): any { return Citizen.invokeNative("0x7F4724035FDCA1DD", ...args); }
}
