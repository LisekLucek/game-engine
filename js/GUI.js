export default class GUI {
    constructor() {
        this.renderObjects = [];
    }
    loadScreen(screen) {
        this._currentScreen = screen;
        if (this.renderObjects.length)
            this.renderObjects.pop();
        this.renderObjects.push(screen);
    }
}
//# sourceMappingURL=GUI.js.map