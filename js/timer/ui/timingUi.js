/* timer [timing ui] */
class TimingUi {
  constructor() {
    this.uiElement = document.querySelector("#timingUi");
    this.startButtonElement = document.querySelector("#timingUi .start .button");
    this.yellowBackgroundElement = document.querySelector("#timingUi .background .yellow");
    this.grayBackgroundElement = document.querySelector("#timingUi .background .gray");

    this.clockElement = document.querySelector("#timingUi .clock");
    this.durationSetterElement = document.querySelector("#timingUi .durationSetter");
    this.durationValueElement = document.querySelector("#timingUi .durationSetter .durationValue");
    this.stepDownButtonElement = document.querySelector("#timingUi .durationSetter .stepDown");
    this.stepUpButtonElement = document.querySelector("#timingUi .durationSetter .stepUp");
    this.stopwatchModeButtonElement = document.querySelector("#timingUi .modeToggle .stopwatchMode");
    this.napModeButtonElement = document.querySelector("#timingUi .modeToggle .napMode");

    let onClickStartButton = this.OnClickStartButton.bind(this);
    let onMouseDownButton = this.OnMouseDownButton.bind(this);
    let onClickStopwatchMode = this.OnClickStopwatchMode.bind(this);
    let onClickNapMode = this.OnClickNapMode.bind(this);
    let onClickStepDown = this.OnClickStepDown.bind(this);
    let onClickStepUp = this.OnClickStepUp.bind(this);

    this.startButtonElement.onmousedown = onMouseDownButton;
    this.startButtonElement.onclick = onClickStartButton;
    this.stopwatchModeButtonElement.onclick = onClickStopwatchMode;
    this.napModeButtonElement.onclick = onClickNapMode;
    this.stepDownButtonElement.onclick = onClickStepDown;
    this.stepUpButtonElement.onclick = onClickStepUp;

    this.yellowBackgroundElement.style.opacity = "0";
    this.grayBackgroundElement.style.opacity = "0";

    this.RefreshDurationText();
  }

  OpenOrCloseUi(_isOpen) {
    if (_isOpen == true) {
      this.UiElement.style.display = "block";
    } else {
      this.UiElement.style.display = "none";
    }
  }

  get UiElement() {
    return this.uiElement;
  }

  /* [refresh the minutes number shown on the duration stepper]
       (call after loading saved data, or after +/- is pressed) */
  RefreshDurationText() {
    this.durationValueElement.innerText = TimerApp.Datas.focusDurationMinutes + "";
  }

  OnMouseDownButton() {
    TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
  }

  OnClickStartButton() {
    if (TimerApp.Datas.timerMode == ModeType.Focus) {
      let _totalDurationMs = TimerApp.Datas.focusDurationMinutes * 60000;
      TimerApp.Datas.currentTime.ChangeMinute(TimerApp.Datas.focusDurationMinutes);
      TimerApp.Datas.currentTime.ChangeSeconds(0);
      TimerApp.Datas.currentTime.ChangeMilliseconds(0);
      TimerApp.Uis.StopwatchUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
      TimerApp.Datas.currentState = StateType.Run;
      TimerApp.Systems.TimeSystem.StartCountdown(_totalDurationMs);
    } else {
      TimerApp.Uis.StopwatchUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
      TimerApp.Datas.currentState = StateType.Run;
      TimerApp.Systems.TimeSystem.Start();
    }
    TimerApp.Uis.StopwatchUi.OnSessionStart();
    TimerApp.Uis.TimingUi.OpenOrCloseUi(false);
    TimerApp.Uis.StopwatchUi.OpenOrCloseUi(true);
  }

  /* [switch to Stopwatch mode] */
  OnClickStopwatchMode() {
    if (TimerApp.Datas.timerMode != ModeType.Stopwatch) {
      TimerApp.Datas.timerMode = ModeType.Stopwatch;
      this.stopwatchModeButtonElement.classList.add("active");
      this.napModeButtonElement.classList.remove("active");
      this.clockElement.style.display = "block";
      this.durationSetterElement.style.display = "none";
    }
    TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
  }

  /* [switch to Focus/Nap mode] */
  OnClickNapMode() {
    if (TimerApp.Datas.timerMode != ModeType.Focus) {
      TimerApp.Datas.timerMode = ModeType.Focus;
      this.napModeButtonElement.classList.add("active");
      this.stopwatchModeButtonElement.classList.remove("active");
      this.clockElement.style.display = "none";
      this.durationSetterElement.style.display = "block";
    }
    TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
  }

  /* [decrease nap duration by 5 minutes] */
  OnClickStepDown() {
    TimerApp.Datas.focusDurationMinutes = Tools.ClampNumber(TimerApp.Datas.focusDurationMinutes - 5, 5, 90);
    this.RefreshDurationText();
    TimerApp.Systems.SaveSystem.Save();
    TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
  }

  /* [increase nap duration by 5 minutes] */
  OnClickStepUp() {
    TimerApp.Datas.focusDurationMinutes = Tools.ClampNumber(TimerApp.Datas.focusDurationMinutes + 5, 5, 90);
    this.RefreshDurationText();
    TimerApp.Systems.SaveSystem.Save();
    TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
  }
}
