/* all enum types */
// state type
var StateType;
(function (StateType) {
    StateType[StateType["None"] = 0] = "None";
    StateType[StateType["Run"] = 1] = "Run";
    StateType[StateType["Pause"] = 2] = "Pause";
})(StateType || (StateType = {}));
// audio type
var AudioType;
(function (AudioType) {
    AudioType[AudioType["None"] = 0] = "None";
    AudioType[AudioType["CatUp"] = 2] = "CatUp";
    AudioType[AudioType["CatDown"] = 3] = "CatDown";
    AudioType[AudioType["ButtonDown"] = 4] = "ButtonDown";
    AudioType[AudioType["ButtonUp"] = 5] = "ButtonUp";
    AudioType[AudioType["NapComplete"] = 6] = "NapComplete";
})(AudioType || (AudioType = {}));
// timer mode type
var ModeType;
(function (ModeType) {
    ModeType[ModeType["Stopwatch"] = 0] = "Stopwatch";
    ModeType[ModeType["Focus"] = 1] = "Focus";
})(ModeType || (ModeType = {}));
