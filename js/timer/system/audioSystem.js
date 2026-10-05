/* system: [audio system] */
class AudioSystem {
    /* constructor */
    constructor() {
        /* init components */
        this.buttonDownAudio = document.querySelector("#audios .buttonDown");
        this.buttonUpAudio = document.querySelector("#audios .buttonUp");
        this.catUpAudios = new Array();
        this.catUpAudios.push(document.querySelector("#audios .catUp1"));
        this.catUpAudios.push(document.querySelector("#audios .catUp2"));
        this.catUpAudios.push(document.querySelector("#audios .catUp3"));
        this.catDownAudios = new Array();
        this.catDownAudios.push(document.querySelector("#audios .catDown1"));
        this.catDownAudios.push(document.querySelector("#audios .catDown2"));
        this.catDownAudios.push(document.querySelector("#audios .catDown3"));
        this.countdownCompleteAudio = document.querySelector("#audios .countdownComplete");
        this.purrAudio = document.querySelector("#audios .purr");
    }
    /* methods */
    /* [play audio]
       param1: audio type */
    PlayAudio(_audioType) {
        // if user set to not play audio, don't execute code
        if (TimerApp.Datas.volume <= 0)
            return;
        // play sound
        try {
            switch (_audioType) {
                case AudioType.ButtonDown:
                    this.buttonDownAudio.play();
                    break;
                case AudioType.ButtonUp:
                    this.buttonUpAudio.play();
                    break;
                case AudioType.CatUp:
                    let _catUpIndex = Tools.RandomInt(0, this.catUpAudios.length);
                    this.catUpAudios[_catUpIndex].play();
                    this.StopAudio(AudioType.CatUp, _catUpIndex);
                    this.StopAudio(AudioType.CatDown);
                    break;
                case AudioType.CatDown:
                    let _catDownIndex = Tools.RandomInt(0, this.catDownAudios.length);
                    this.catDownAudios[_catDownIndex].play();
                    this.StopAudio(AudioType.CatUp);
                    this.StopAudio(AudioType.CatDown, _catDownIndex);
                    break;
                case AudioType.CountdownComplete:
                    this.countdownCompleteAudio.currentTime = 0;
                    this.countdownCompleteAudio.play();
                    break;
            }
        } catch (e) {
            console.log("Audio error:", e);
        }
    }
    /* [start purr ambience loop] (no-op if purring is disabled or app is muted) */
    StartPurr() {
        if (TimerApp.Datas.purrEnabled != true)
            return;
        if (TimerApp.Datas.volume <= 0)
            return;
        try {
            let _playPromise = this.purrAudio.play();
            // browsers block audio before the first user interaction (e.g. purr was saved as on)
            if (_playPromise && _playPromise.catch) {
                _playPromise.catch(() => this.StartPurrOnFirstInteraction());
            }
        } catch (e) {}
    }
    /* [retry starting the purr on the user's first click/key press] */
    StartPurrOnFirstInteraction() {
        if (this.purrRetryPending == true)
            return;
        this.purrRetryPending = true;
        let _retry = () => {
            document.removeEventListener("pointerdown", _retry);
            document.removeEventListener("keydown", _retry);
            this.purrRetryPending = false;
            this.StartPurr();
        };
        document.addEventListener("pointerdown", _retry);
        document.addEventListener("keydown", _retry);
    }
    /* [stop purr ambience loop] */
    StopPurr() {
        try {
            this.purrAudio.pause();
        } catch (e) {}
    }
    /* [enable/disable purr ambience]
       param1: true = on, false = off */
    UpdatePurrEnabled(_enabled) {
        TimerApp.Datas.purrEnabled = _enabled;
        if (_enabled != true) {
            this.StopPurr();
        } else {
            this.StartPurr();
        }
    }
    /* [update purr ambience volume] (independent of master volume) */
    UpdatePurrVolume(_volume) {
        TimerApp.Datas.purrVolume = _volume;
        try {
            this.purrAudio.volume = _volume / 100;
        } catch (e) {}
    }
    /* [stop audio] */
    StopAudio(_audioType, _noStopIndex = -1) {
        try {
            switch (_audioType) {
                case AudioType.CatUp:
                    for (let i = 0; i < this.catUpAudios.length; i++) {
                        if (_noStopIndex != i) {
                            this.catUpAudios[i].pause();
                            this.catUpAudios[i].currentTime = 0;
                        }
                    }
                    break;
                case AudioType.CatDown:
                    for (let i = 0; i < this.catDownAudios.length; i++) {
                        if (_noStopIndex != i) {
                            this.catDownAudios[i].pause();
                            this.catDownAudios[i].currentTime = 0;
                        }
                    }
                    break;
            }
        } catch (e) {}
    }
    /* [update volume] */
    UpdateVolume(_volume) {
        TimerApp.Datas.volume = _volume;
        _volume = _volume / 100;
        try {
            this.buttonDownAudio.volume = _volume;
            this.buttonUpAudio.volume = _volume;
            for (let i = 0; i < this.catUpAudios.length; i++) {
                this.catUpAudios[i].volume = _volume;
            }
            for (let i = 0; i < this.catDownAudios.length; i++) {
                this.catDownAudios[i].volume = _volume;
            }
            this.countdownCompleteAudio.volume = _volume;
        } catch (e) {}
    }
}