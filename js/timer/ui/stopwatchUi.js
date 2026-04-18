/* timer [stopwatch ui] */
class StopwatchUi {
    /* constructor */
    constructor() {
        /* init */
        // init [components]
        this.uiElement = document.querySelector("#stopwatchUi");
        this.blackCatPanelElement = document.querySelector("#stopwatchUi .blackCat .cat");
        this.blackCatRopeElement = document.querySelector("#stopwatchUi .blackCat .rope");
        this.blackCatOpenMouthElement = document.querySelector("#stopwatchUi .blackCat .cat .mouth");
        this.blackCatCloseMouthElement = document.querySelector("#stopwatchUi .blackCat .cat .close");
        this.grayCatPanelElement = document.querySelector("#stopwatchUi .grayCat .cat");
        this.grayCatRopeElement = document.querySelector("#stopwatchUi .grayCat .rope");
        this.grayCatOpenMouthElement = document.querySelector("#stopwatchUi .grayCat .cat .mouth");
        this.grayCatCloseMouthElement = document.querySelector("#stopwatchUi .grayCat .cat .close");
        this.grayCatPauseTextElement = document.querySelector("#stopwatchUi .grayCat .rope .text .pause");
        this.grayCatResumeTextElement = document.querySelector("#stopwatchUi .grayCat .rope .text .resume");
        this.timeTextElement = document.querySelector("#stopwatchUi .time .timeText");
        this.pausedPanelElement = document.querySelector("#stopwatchUi .paused");
        this.pausedTimeTextElement = document.querySelector("#stopwatchUi .paused .timeText");
        /* change this reference (point to current TitleBarUi object) */
        let onMouseEnterBlackCatPanel = this.OnMouseEnterBlackCatPanel.bind(this);
        let onMouseLeaveBlackCatPanel = this.OnMouseLeaveBlackCatPanel.bind(this);
        let onMouseDownBlackCatMouthButton = this.OnMouseDownBlackCatMouthButton.bind(this);
        let onMouseUpBlackCatPanel = this.OnMouseUpBlackCatPanel.bind(this);
        let onClickBlackCatMouthButton = this.OnClickBlackCatMouthButton.bind(this);
        let onMouseEnterYellowCatPanel = this.OnMouseEnterYellowCatPanel.bind(this);
        let onMouseLeaveYellowCatPanel = this.OnMouseLeaveYellowCatPanel.bind(this);
        let onMouseDownYellowCatMouthButton = this.OnMouseDownYellowCatMouthButton.bind(this);
        let onClickYellowCatMouthButton = this.OnClickYellowCatMouthButton.bind(this);
        let onMouseUpYellowCatPanel = this.OnMouseUpYellowCatPanel.bind(this);
        let onContextMenuUi = this.OnContextMenuUi.bind(this);
        let onDragStartUi = this.OnDragStartUi.bind(this);
        /* register events */
        this.blackCatPanelElement.onmouseenter = onMouseEnterBlackCatPanel;
        this.blackCatPanelElement.onmouseleave = onMouseLeaveBlackCatPanel;
        this.blackCatPanelElement.onmouseup = onMouseUpBlackCatPanel;
        this.blackCatOpenMouthElement.onmousedown = onMouseDownBlackCatMouthButton;
        this.blackCatOpenMouthElement.onclick = onClickBlackCatMouthButton;
        this.grayCatPanelElement.onmouseenter = onMouseEnterYellowCatPanel;
        this.grayCatPanelElement.onmouseleave = onMouseLeaveYellowCatPanel;
        this.grayCatPanelElement.onmouseup = onMouseUpYellowCatPanel;
        this.grayCatOpenMouthElement.onmousedown = onMouseDownYellowCatMouthButton;
        this.grayCatOpenMouthElement.onclick = onClickYellowCatMouthButton;
        this.uiElement.oncontextmenu = onContextMenuUi;
        this.uiElement.ondragstart = onDragStartUi;
    }
    /* property */
    // element: stopwatch ui
    get UiElement() {
        return this.uiElement;
    }
    /* public methods */
    /* [open/close this ui]
       param1: true = open, false = close */
    OpenOrCloseUi(_isOpen) {
        // if open [setting ui]
        if (_isOpen == true) {
            // show
            this.UiElement.style.display = "block";
        }
        // if close [setting ui]
        else {
            // close paused panel
            this.pausedPanelElement.style.visibility = "hidden";
            // reset gray cat text (change resume image to pause image)
            this.grayCatPauseTextElement.style.opacity = "1";
            this.grayCatResumeTextElement.style.opacity = "0";
            // hide
            this.UiElement.style.display = "none";
        }
    }
    /* [update time]
        param1: time */
    UpdateTimeText(_time) {
        this.timeTextElement.innerText = _time;
    }
    /* events */
    // when mouse enters [black cat]
    OnMouseEnterBlackCatPanel() {
        // lower rope
        this.blackCatRopeElement.style.top = "-40px";
        // play rope swing animation
        this.blackCatRopeElement.style.animation = "blackCatRopeSwingAnimation 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate backwards";
        // play sound
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatUp);
    }
    // when mouse leaves [black cat]
    OnMouseLeaveBlackCatPanel() {
        // retract rope
        this.blackCatRopeElement.style.top = "-341px";
        // stop rope swing animation
        this.blackCatRopeElement.style.animation = "";
        // play sound
        if (this.uiElement.style.display != "none") {
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatDown);
        }
        // hide cat close mouth
        this.OnMouseUpBlackCatPanel();
    }
    // when mouse releases on [black cat]
    OnMouseUpBlackCatPanel() {
        // enlarge cat mouth
        this.blackCatOpenMouthElement.style.transform = "scale(1)";
        // hide cat close mouth
        this.blackCatCloseMouthElement.style.opacity = "0";
        this.blackCatCloseMouthElement.style.transform = "scale(1,0.8)";
        // continue rope animation
        this.blackCatRopeElement.style.animationPlayState = "running";
    }
    // when mouse presses on [black cat mouth]
    OnMouseDownBlackCatMouthButton(e) {
        // if left button
        if (e.button == 0) {
            // shrink cat mouth
            this.blackCatOpenMouthElement.style.transform = "scale(0.75)";
            // show cat close mouth
            this.blackCatCloseMouthElement.style.opacity = "1";
            this.blackCatCloseMouthElement.style.transform = "scale(1,1)";
            // pause rope animation
            this.blackCatRopeElement.style.animationPlayState = "paused";
            // play sound
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        }
    }
    // when mouse clicks [black cat mouth]
    OnClickBlackCatMouthButton() {
        // update state
        TimerApp.Datas.currentState = StateType.None;
        // reset time
        TimerApp.Datas.currentTime.ChangeMinute(0);
        TimerApp.Datas.currentTime.ChangeSeconds(0);
        TimerApp.Datas.currentTime.ChangeMilliseconds(0);
        // close [stopwatch ui]
        TimerApp.Uis.StopwatchUi.OpenOrCloseUi(false);
        // open [timing ui]
        TimerApp.Uis.TimingUi.OpenOrCloseUi(true);
        // mouse leave black cat
        this.blackCatRopeElement.style.top = "-341px"; // retract rope
        this.blackCatRopeElement.style.animation = "";
        // play sound
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
    }
    // when mouse enters [gray cat]
    OnMouseEnterYellowCatPanel() {
        // lower rope
        this.grayCatRopeElement.style.top = "-30px";
        // play rope swing animation
        this.grayCatRopeElement.style.animation = "grayCatRopeSwingAnimation 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate backwards";
        // play sound
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatUp);
    }
    // when mouse leaves [gray cat]
    OnMouseLeaveYellowCatPanel() {
        // retract rope
        this.grayCatRopeElement.style.top = "-369px";
        // stop rope swing animation
        this.grayCatRopeElement.style.animation = "";
        // play sound
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatDown);
        // hide cat close mouth
        this.OnMouseUpYellowCatPanel();
    }
    // when mouse releases on [gray cat]
    OnMouseUpYellowCatPanel() {
        // shrink cat mouth
        this.grayCatOpenMouthElement.style.transform = "scale(1)";
        // hide cat close mouth
        this.grayCatCloseMouthElement.style.opacity = "0";
        this.grayCatCloseMouthElement.style.transform = "scale(1,0.8)";
        // continue rope animation
        this.grayCatRopeElement.style.animationPlayState = "running";
    }
    // when mouse presses on [gray cat mouth]
    OnMouseDownYellowCatMouthButton(e) {
        // if left button
        if (e.button == 0) {
            // shrink cat mouth
            this.grayCatOpenMouthElement.style.transform = "scale(0.75)";
            // show cat close mouth
            this.grayCatCloseMouthElement.style.opacity = "1";
            this.grayCatCloseMouthElement.style.transform = "scale(1,1)";
            // pause rope animation
            this.grayCatRopeElement.style.animationPlayState = "paused";
            // play sound
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        }
    }
    // when mouse clicks [gray cat mouth]
    OnClickYellowCatMouthButton() {
        // if pressed is [pause button]
        if (this.pausedPanelElement.style.visibility != "visible") {
            // then pause
            if (TimerApp.Datas.currentState == StateType.Run) {
                TimerApp.Datas.currentState = StateType.Pause;
            }
            // change pause image to resume image
            this.grayCatPauseTextElement.style.opacity = "0";
            this.grayCatResumeTextElement.style.opacity = "1";
            // update paused time
            this.pausedTimeTextElement.innerText = TimerApp.Datas.currentTime.ToString();
            // open paused ui
            this.pausedPanelElement.style.visibility = "visible";
        }
        // if pressed is [resume button]
        else {
            // then resume
            if (TimerApp.Datas.currentState == StateType.Pause) {
                TimerApp.Datas.currentState = StateType.Run;
            }
            // change resume image to pause image
            this.grayCatPauseTextElement.style.opacity = "1";
            this.grayCatResumeTextElement.style.opacity = "0";
            // close paused ui
            this.pausedPanelElement.style.visibility = "hidden";
        }
        // play sound
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
    }
    // when right click [setting ui]
    OnContextMenuUi() {
        // don't show right click menu
        window.event.returnValue = false;
        return false;
    }
    // when start dragging
    OnDragStartUi() {
        // disable drag
        return false;
    }
}