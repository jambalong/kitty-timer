/* system: [time system] */
class TimeSystem {
    /* constructor */
    constructor() {
        // change this reference (point to current TimeSystem object)
        let timerOnTick = this.TimerOnTick.bind(this);
        // start timer (call every 10ms)
        window.setInterval(timerOnTick, 10);
    }
    /* private method */
    /* timer trigger method:
       (call this method every 10ms)
       when timer reaches interval, trigger this method */
    TimerOnTick() {
        /* check if should count? */
        if (TimerApp.Datas.currentState != StateType.Run)
            return;
        // add 10ms to time
        TimerApp.Datas.currentTime.AddOrRemoveMilliseconds(10);
        // update [Ui]
        TimerApp.Uis.StopwatchUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
    }
}