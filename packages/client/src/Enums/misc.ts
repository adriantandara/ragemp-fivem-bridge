export const ScreenshotType = Object.freeze({ JPEG: 0, PNG: 1, BMP: 2 });

export const Console = Object.freeze({
  Verbosity: Object.freeze({ None: 0, Error: 1, Warning: 2, Info: 3, Debug: 4 }),
});

export const Voice = Object.freeze({
  BASSFXChan: Object.freeze({
    BASSFXCHAN_DEFAULT: 0, BASSFXCHAN_1: 1, BASSFXCHAN_2: 2,
    BASSFXCHAN_3: 3, BASSFXCHAN_4: 4, BASSFXCHAN_5: 5,
    BASSFXCHAN_6: 6, BASSFXCHAN_7: 7, BASSFXCHAN_8: 8,
    BASSFXCHAN_9: 9, BASSFXCHAN_10: 10, BASSFXCHAN_11: 11,
    BASSFXCHAN_12: 12, BASSFXCHAN_13: 13, BASSFXCHAN_14: 14,
    BASSFXCHAN_15: 15, BASSFXCHAN_16: 16, BASSFXCHAN_17: 17,
    BASSFXCHAN_18: 18, BASSFXCHAN_19: 19, BASSFXCHAN_20: 20,
    BASSFXCHAN_21: 21, BASSFXCHAN_22: 22, BASSFXCHAN_23: 23,
    BASSFXCHAN_24: 24, BASSFXCHAN_25: 25, BASSFXCHAN_26: 26,
    BASSFXCHAN_27: 27, BASSFXCHAN_28: 28, BASSFXCHAN_29: 29,
    BASSFXCHAN_30: 30, BASSFXCHAN_31: 31,
  }),
  BASSFXType: Object.freeze({
    None: 0, Chorus: 1, Compressor: 2, Distortion: 3, Echo: 4,
    Flanger: 5, Gargle: 6, I3DL2Reverb: 7, ParamEQ: 8,
    Reverb: 9, Rotate: 10, Volume: 11,
  }),
  BASSFXPhase: Object.freeze({
    Neg180: 0, Neg90: 1, Zero: 2, Pos90: 3, Pos180: 4,
  }),
});

export const Hud = Object.freeze({
  ComponentType: Object.freeze({
    HUD: 0, WANTED_STARS: 1, WEAPON_ICON: 2, CASH: 3, MP_CASH: 4, MP_MESSAGE: 5,
    VEHICLE_NAME: 6, AREA_NAME: 7, VEHICLE_CLASS: 8, STREET_NAME: 9, HELP_TEXT: 10,
    FLOATING_HELP_TEXT_1: 11, FLOATING_HELP_TEXT_2: 12, CASH_CHANGE: 13, RETICLE: 14,
    SUBTITLE_TEXT: 15, RADIO_STATIONS: 16, SAVING_GAME: 17, GAME_STREAM: 18,
    WEAPON_WHEEL: 19, WEAPON_WHEEL_STATS: 20, HUD_COMPONENTS: 21, HUD_WEAPONS: 22,
  }),
  Color: Object.freeze({
    PureWhite: 0, White: 1, Black: 2, Grey: 3, LightGrey: 4, DarkGrey: 5,
    Red: 6, RedLight: 7, RedDark: 8, Blue: 9, BlueLight: 10, BlueDark: 11,
    Yellow: 12, YellowLight: 13, YellowDark: 14, Orange: 15, OrangeLight: 16,
    OrangeDark: 17, Green: 18, GreenLight: 19, GreenDark: 20, Purple: 21,
    PurpleLight: 22, PurpleDark: 23, Pink: 24,
  }),
  Style: Object.freeze({
    Default: 0, ShoutText: 1, ShoutTextNoFlash: 2, Streamed: 3, Whisper: 4,
  }),
  CheckpointType: Object.freeze({
    CylinderSingleArrow: 0, CylinderDoubleArrow: 1, CylinderTripleArrow: 2,
    CylinderCycleArrow: 3, CylinderCheckerboard: 4, CylinderWrench: 5,
    CylinderSingleArrow2: 6, CylinderDoubleArrow2: 7, CylinderTripleArrow2: 8,
    CylinderCycleArrow2: 9, CylinderCheckerboard2: 10, CylinderWrench2: 11,
    Ring: 45, Empty: 46,
  }),
  Notification: Object.freeze({
    Default: 0, Bubble: 1, Mention: 2, Reply: 3, Reputation: 4,
  }),
  WeaponIcon: Object.freeze({
    Unarmed: 0, Pistol: 1, Knife: 2,
  }),
});

export const Camera = Object.freeze({
  GraphTypes: Object.freeze({
    Linear: 0, SinAccelDecel: 1, Accel: 2, Decel: 3, SlowIn: 4, SlowOut: 5,
    SlowInOut: 6, QuadraticIn: 7, QuadraticOut: 8, QuadraticInOut: 9,
    CubicIn: 10, CubicOut: 11, CubicInOut: 12, QuarticIn: 13, QuarticOut: 14,
    QuarticInOut: 15, QuinticIn: 16, QuinticOut: 17, QuinticInOut: 18,
    CircularIn: 19, CircularOut: 20, CircularInOut: 21,
  }),
});

export const Notification = Object.freeze({
  IconType: Object.freeze({
    Default: 0, ChatBox: 1, EMail: 2, AddFriendRequest: 3, RightJumpingArrow: 7,
    RPIcon: 8, DollarIcon: 9,
  }),
});

export const PropDamage = Object.freeze({
  None: 0, Minor: 1, Moderate: 2, Major: 3, Destroyed: 4,
});

export const Scripts = Object.freeze({
  main: "main",
  main_persistent: "main_persistent",
  freemode: "freemode",
  shop_controller: "shop_controller",
  selector: "selector",
  cellphone_controller: "cellphone_controller",
  pause_menu: "pause_menu",
  appcamera: "appcamera",
  appcontacts: "appcontacts",
  appmessages: "appmessages",
  apptextmessage: "apptextmessage",
});

export const Peds = Object.freeze({
  FreemodeMale: 0x705E61F2,
  FreemodeFemale: 0x9C9EFFD8,
  Michael: 0x0D7114C9,
  Franklin: 0x9B22DBAF,
  Trevor: 0x9B810FA2,
  Cop: 0x5E3DA4A4,
  Sheriff: 0xB3F3EE34,
  Swat: 0xBD86F77B,
  Paramedic: 0x6886266A,
  Fireman: 0x8FC4AB7,
  Trucker: 0x7F12D8DA,
  Mechanic: 0x90EE6483,
  Hooker: 0x4584D188,
  Construction: 0x96621E1C,
  PaparazziMale: 0xC03DBDB3,
});
