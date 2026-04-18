/* all [systems] */
class Systems {
    /* constructor */
    constructor() {
        // init
        this.audioSystem = new AudioSystem();
        this.timeSystem = new TimeSystem();
        this.saveSystem = new SaveSystem();
    }
    /* properties */
    // [audio system]
    get AudioSystem() {
        return this.audioSystem;
    }
    // [time system]
    get TimeSystem() {
        return this.timeSystem;
    }
    // [save system]
    get SaveSystem() {
        return this.saveSystem;
    }
}
