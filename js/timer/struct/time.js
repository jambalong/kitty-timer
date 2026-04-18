/* time: minute, second, millisecond */
class Time {
  /* constructor */
  constructor(_minute = 0, _seconds = 0, _milliseconds = 0) {
    this.minute = _minute;
    this.seconds = _seconds;
    this.milliseconds = _milliseconds;
  }
  /* methods */
  /* [add/remove millisecond]
       param1: millisecond change (+ = add, - = remove) */
  AddOrRemoveMilliseconds(_changeMilliseconds) {
    // new millisecond after change
    let _newMilliseconds = this.milliseconds + _changeMilliseconds;
    // if less than 0
    if (_newMilliseconds < 0) {
      // borrow from minute
      this.minute -= 1;
      if (this.minute < 0) this.minute = 0;
      _newMilliseconds += 60000;
    }
    // if >= 1000
    else if (_newMilliseconds >= 1000) {
      // add to second
      this.seconds += 1;
      _newMilliseconds -= 1000;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minute += 1;
      }
    }
    this.milliseconds = _newMilliseconds;
  }
  /* [change minute] */
  ChangeMinute(_minute) {
    // minute max is 99, min is 0
    _minute = Tools.ClampNumber(_minute, 0, 99);
    // then update minute
    this.minute = _minute;
  }
  /* [change second] */
  ChangeSeconds(_seconds) {
    // second max is 59, min is 0
    _seconds = Tools.ClampNumber(_seconds, 0, 59);
    // then update second
    this.seconds = _seconds;
  }
  /* [change millisecond] */
  ChangeMilliseconds(_milliseconds) {
    // millisecond max is 999, min is 0
    _milliseconds = Tools.ClampNumber(_milliseconds, 0, 999);
    // then update millisecond
    this.milliseconds = _milliseconds;
  }
  /* [convert time to "minute:second"] */
  ToString() {
    // minute and second
    let _minute = Tools.NumberToString(this.minute, 2);
    let _seconds = Tools.NumberToString(this.seconds, 2);
    let _milliseconds = Tools.NumberToString(this.milliseconds, 2);
    // return value
    return _minute + ":" + _seconds + "." + _milliseconds;
  }
}