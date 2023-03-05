export default class GUI {
    loadScreen(screen) {
        this._currentScreen = screen;
    }
    draw() {
        this._currentScreen.draw();
    }
}
