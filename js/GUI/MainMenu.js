import Screen from "./Screen.js";
import GUIButton from "./GUIElements/GUIButton.js";
export default class MainMenu extends Screen {
    constructor(canvas) {
        super();
        this.renderObjects = [];
        const newGameButton = new GUIButton(134, 114, 92, 16, "New Game", canvas);
        const settingsButton = new GUIButton(134, 136, 92, 16, "Settings", canvas);
        newGameButton.on("click", () => {
            console.log("Clicked!");
        });
        this.renderObjects.push(newGameButton);
        this.renderObjects.push(settingsButton);
        // this.elements.push(newGameButton);
        // this.elements.push(settingsButton);
    }
}
//# sourceMappingURL=MainMenu.js.map