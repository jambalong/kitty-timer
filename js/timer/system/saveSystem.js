/* system: [save & load system] */
class SaveSystem {
    Save() {
        try {
            let _localStorage = window.localStorage;
            _localStorage.setItem("volume", TimerApp.Datas.volume + "");
        } catch (e) {}
    }
    Load() {
        try {
            let _localStorage = window.localStorage;
            let _volume = _localStorage.getItem("volume");
            if (_volume != null) {
                TimerApp.Datas.volume = window.parseInt(_volume);
            }
            if (TimerApp.Systems && TimerApp.Systems.AudioSystem) {
                TimerApp.Systems.AudioSystem.UpdateVolume(TimerApp.Datas.volume);
            }
        } catch (e) {}
    }
}