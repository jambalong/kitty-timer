/* timer [timing ui] */
class TimingUi {
    constructor() {
        this.uiElement = document.querySelector("#timingUi");
        this.startButtonElement = document.querySelector("#timingUi .start .button");
        this.yellowBackgroundElement = document.querySelector("#timingUi .background .yellow");
        this.grayBackgroundElement = document.querySelector("#timingUi .background .gray");

        let onClickStartButton = this.OnClickStartButton.bind(this);
        let onMouseDownButton = this.OnMouseDownButton.bind(this);

        this.startButtonElement.onmousedown = onMouseDownButton;
        this.startButtonElement.onclick = onClickStartButton;

        this.yellowBackgroundElement.style.opacity = "1";
        this.grayBackgroundElement.style.opacity = "1";
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

    OnMouseDownButton() {
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
    }

    OnClickStartButton() {
        TimerApp.Uis.StopwatchUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
        TimerApp.Datas.currentState = StateType.Run;
        TimerApp.Uis.TimingUi.OpenOrCloseUi(false);
        TimerApp.Uis.StopwatchUi.OpenOrCloseUi(true);
    }
}