/* all data */
class Datas {
    /* constructor */
    constructor() {
        this.currentState = StateType.None;
        this.volume = 100;
        this.currentTime = new Time(0, 0, 0);
        // countdown timer
        this.timerMode = ModeType.Stopwatch;
        this.countdownDurationMinutes = 20;
        this.breakTipsEnabled = true;
        // minutes between break tips; 0 = off
        this.breakTipsIntervalMinutes = 0;
        // purr ambience
        this.purrEnabled = false;
        this.purrVolume = 50;
    }
}