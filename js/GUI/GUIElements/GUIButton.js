import GUIInteractiveElement from "./GUIInteractiveElement.js";
export default class GUIButton extends GUIInteractiveElement {
    constructor(posX, posY, sizeX, sizeY, text, canvas) {
        super(posX, posY, sizeX, sizeY, canvas, "gui/button");
        this.textures = [];
        this.text = text;
        this.on("hover", () => {
            if (!this.pressed)
                this.setTexture("gui/button_hover");
        });
        this.on("hoverLeave", () => {
            if (!this.pressed)
                this.setTexture("gui/button");
        });
        this.on("press", () => {
            this.setTexture("gui/button_clicked");
        });
        this.on("release", () => {
            if (this.hovering)
                this.setTexture("gui/button_hover");
            else
                this.setTexture("gui/button");
        });
    }
    renderElement(posX, posY, canvas) {
        canvas.drawImage(this.textures[0], posX + this.posX, posY + this.posY);
        canvas.writeText(this.text, this.posX + Math.floor(this.sizeX / 2), this.posY + Math.floor(this.sizeY / 2) + 1, undefined, "center", "middle");
    }
}
//# sourceMappingURL=GUIButton.js.map