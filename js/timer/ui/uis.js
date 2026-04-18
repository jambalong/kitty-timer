/* all [Ui] */
class Uis {
    constructor() {
        this.stopwatchUi = new StopwatchUi();
        this.timingUi = new TimingUi();
    }
    get StopwatchUi() {
        return this.stopwatchUi;
    }
    get TimingUi() {
        return this.timingUi;
    }
}