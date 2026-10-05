/* system: [save & load system] */
class SaveSystem {
    Save() {
        try {
            let _localStorage = window.localStorage;
            _localStorage.setItem("volume", TimerApp.Datas.volume + "");
            _localStorage.setItem("countdownDurationMinutes", TimerApp.Datas.countdownDurationMinutes + "");
            _localStorage.setItem("breakTipsEnabled", TimerApp.Datas.breakTipsEnabled ? "1" : "0");
            _localStorage.setItem("purrEnabled", TimerApp.Datas.purrEnabled ? "1" : "0");
            _localStorage.setItem("purrVolume", TimerApp.Datas.purrVolume + "");
        } catch (e) {}
    }
    Load() {
        try {
            let _localStorage = window.localStorage;
            let _volume = _localStorage.getItem("volume");
            if (_volume != null) {
                TimerApp.Datas.volume = window.parseInt(_volume);
            }
            let _countdownDurationMinutes = _localStorage.getItem("countdownDurationMinutes") ?? _localStorage.getItem("focusDurationMinutes");
            if (_countdownDurationMinutes != null) {
                TimerApp.Datas.countdownDurationMinutes = Tools.ClampNumber(window.parseInt(_countdownDurationMinutes), 5, 90);
            }
            let _breakTipsEnabled = _localStorage.getItem("breakTipsEnabled") ?? _localStorage.getItem("napMessagesEnabled");
            if (_breakTipsEnabled != null) {
                TimerApp.Datas.breakTipsEnabled = _breakTipsEnabled == "1";
            }
            let _purrEnabled = _localStorage.getItem("purrEnabled");
            if (_purrEnabled != null) {
                TimerApp.Datas.purrEnabled = _purrEnabled == "1";
            }
            let _purrVolume = _localStorage.getItem("purrVolume");
            if (_purrVolume != null) {
                TimerApp.Datas.purrVolume = window.parseInt(_purrVolume);
            }
            if (TimerApp.Systems && TimerApp.Systems.AudioSystem) {
                TimerApp.Systems.AudioSystem.UpdateVolume(TimerApp.Datas.volume);
                TimerApp.Systems.AudioSystem.UpdatePurrVolume(TimerApp.Datas.purrVolume);
            }
            if (TimerApp.Uis && TimerApp.Uis.TimingUi) {
                TimerApp.Uis.TimingUi.RefreshDurationText();
            }
        } catch (e) {}
    }
}