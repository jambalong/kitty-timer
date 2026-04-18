/* system: [time system] */
class TimeSystem {
  constructor() {
    this._startTime = null; // performance.now() when started
    this._accumulated = 0; // ms banked before the current run

    let timerOnTick = this.TimerOnTick.bind(this);
    window.setInterval(timerOnTick, 10);
  }

  /* Call this when the timer starts or resumes */
  Start() {
    this._startTime = performance.now();
  }

  /* Call this when the timer pauses */
  Pause() {
    if (this._startTime !== null) {
      this._accumulated += performance.now() - this._startTime;
      this._startTime = null;
    }
  }

  /* Call this when the timer resets */
  Reset() {
    this._startTime = null;
    this._accumulated = 0;
  }

  TimerOnTick() {
    if (TimerApp.Datas.currentState != StateType.Run) return;

    // True elapsed ms — not dependent on how often this fires
    const elapsedMs = this._accumulated + (performance.now() - this._startTime);

    // Convert raw ms into your Time struct fields
    const totalMs = Math.floor(elapsedMs);
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const millis = totalMs % 1000;

    TimerApp.Datas.currentTime.minute = minutes;
    TimerApp.Datas.currentTime.seconds = seconds;
    TimerApp.Datas.currentTime.milliseconds = millis;

    TimerApp.Uis.StopwatchUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
  }
}
