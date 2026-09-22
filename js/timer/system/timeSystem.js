/* system: [time system] */
class TimeSystem {
  constructor() {
    this._startTime = null; // performance.now() when started
    this._accumulated = 0; // ms banked before the current run
    this._totalDurationMs = 0; // countdown target (Focus mode only)
    this._napCompleted = false;

    let timerOnTick = this.TimerOnTick.bind(this);
    window.setInterval(timerOnTick, 10);
  }

  /* Call this when the timer starts or resumes */
  Start() {
    this._startTime = performance.now();
  }

  /* Call this when a Focus/Nap countdown starts (not for resuming — use Start for that) */
  StartCountdown(_totalDurationMs) {
    this._totalDurationMs = _totalDurationMs;
    this._napCompleted = false;
    this.Start();
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
    this._totalDurationMs = 0;
    this._napCompleted = false;
  }

  TimerOnTick() {
    if (TimerApp.Datas.currentState != StateType.Run) return;

    // True elapsed ms — not dependent on how often this fires
    const elapsedMs = this._accumulated + (performance.now() - this._startTime);

    // Focus/Nap mode counts down toward zero instead of counting up
    if (TimerApp.Datas.timerMode == ModeType.Focus) {
      const remainingMs = Math.max(0, this._totalDurationMs - elapsedMs);
      const totalMs = Math.floor(remainingMs);
      const minutes = Math.floor(totalMs / 60000);
      const seconds = Math.floor((totalMs % 60000) / 1000);
      const millis = totalMs % 1000;

      TimerApp.Datas.currentTime.minute = minutes;
      TimerApp.Datas.currentTime.seconds = seconds;
      TimerApp.Datas.currentTime.milliseconds = millis;

      TimerApp.Uis.StopwatchUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());

      const progress = this._totalDurationMs > 0 ? 1 - remainingMs / this._totalDurationMs : 1;
      TimerApp.Uis.StopwatchUi.OnNapProgress(progress);

      if (remainingMs <= 0 && this._napCompleted != true) {
        this._napCompleted = true;
        TimerApp.Uis.StopwatchUi.OnNapComplete();
      }
      return;
    }

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
