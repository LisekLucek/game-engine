import EventObject from "../EventObject.js";
export default class GUIElement extends EventObject {
    constructor(posX, posY, sizeX, sizeY, canvas, textureName) {
        super();
        this._hoverable = false;
        this.hovering = false;
        this._clickable = false;
        this.pressed = false;
        this.posX = posX;
        this.posY = posY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this._canvas = canvas;
        if (typeof textureName != "string") {
            this._texture = canvas.addAsset(textureName.shift());
            for (const texture of textureName) {
                canvas.addAsset(texture);
            }
        }
        else
            this._texture = canvas.addAsset(textureName);
    }
    draw() {
        this._canvas.drawImage(this._texture, this.posX, this.posY);
    }
    setTexture(name) {
        this._texture = this._canvas.addAsset(name);
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
    _isInBoudingBox(posX, posY) {
        return posX >= this.posX && posX < this.posX + this.sizeX && posY >= this.posY && posY < this.posY + this.sizeY;
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
