import GUIElement from "./GUIElements/GUIElement.js";
export default class GUIButton extends GUIElement {
    constructor(posX, posY, sizeX, sizeY, text, canvas) {
        super(posX, posY, sizeX, sizeY, canvas, ["button", "button_hover", "button_clicked"]);
        this.text = text;
        this.on("hover", () => {
            if (!this.pressed)
                this.setTexture("button_hover");
        });
        this.on("hoverLeave", () => {
            if (!this.pressed)
                this.setTexture("button");
        });
        this.on("press", () => {
            this.setTexture("button_clicked");
        });
        this.on("release", () => {
            if (this.hovering)
                this.setTexture("button_hover");
            else
                this.setTexture("button");
        });
    }
    draw() {
        super.draw();
        this._canvas.writeText(this.text, this.posX + Math.floor(this.sizeX / 2), this.posY + Math.floor(this.sizeY / 2) + 1, undefined, "center", "middle");
    }
}
