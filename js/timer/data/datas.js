/* all data */
class Datas {
    /* constructor */
    constructor() {
        this.currentState = StateType.None;
        this.volume = 100;
        this.currentTime = new Time(0, 0, 0);
        // focus/nap timer
        this.timerMode = ModeType.Stopwatch;
        this.focusDurationMinutes = 20;
        this.napMessagesEnabled = true;
        // purr ambience
        this.purrEnabled = false;
        this.purrVolume = 50;
    }
}