/* timer */
/* (manage all logic in timer) (timer entry class) */
class TimerApp {
    /* static properties */
    // all [data]
    static get Datas() {
        return this.datas;
    }
    // all [systems]
    static get Systems() {
        return this.systems;
    }
    // all [ui]
    static get Uis() {
        return this.uis;
    }
    /* static methods */
    // [entry method]: call this method to run timer
    static Start() {
        // init
        this.datas = new Datas();
        this.systems = new Systems();
        this.uis = new Uis();
        // load data
        this.systems.SaveSystem.Load();
    }
}
