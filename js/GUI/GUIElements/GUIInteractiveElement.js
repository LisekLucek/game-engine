import GUIElement from "./GUIElement.js";
export default class GUIInteractiveElement extends GUIElement {
    constructor(posX, posY, sizeX, sizeY, canvas, textureName) {
        super(posX, posY, sizeX, sizeY, canvas, textureName);
        this._hoverable = false;
        this.hovering = false;
        this._clickable = false;
        this.pressed = false;
    }
    on(event, callback) {
        super.on(event, callback);
        switch (event) {
            case "hover":
            case "hoverLeave":
                if (!this._hoverable)
                    this._canvas.on("mousemove", (posX, posY) => this._checkHoverState(posX, posY));
                break;
            case "click":
            case "press":
            case "release":
                if (!this._clickable) {
                    this._canvas.on("mousedown", (posX, posY) => this._checkClickState(posX, posY));
                    this._canvas.on("mouseup", (posX, posY) => this._checkClickState(posX, posY, false));
                }
                break;
        }
    }
    _checkHoverState(posX, posY) {
        if (this._isInBoudingBox(posX, posY)) {
            if (!this.hovering) {
                this.hovering = true;
                this._fireEvent("hover");
            }
        }
        else {
            if (this.hovering) {
                this.hovering = false;
                this._fireEvent("hoverLeave");
            }
        }
    }
    _checkClickState(posX, posY, pressed = true) {
        if (!pressed && this.pressed)
            this._fireEvent("release");
        if (this._isInBoudingBox(posX, posY)) {
            if (!pressed && this.pressed)
                this._fireEvent("click");
            if (pressed && !this.pressed)
                this._fireEvent("press");
            this.pressed = pressed;
        }
        else
            this.pressed = false;
    }
}
