import EventObject from "../../EventObject.js";
export default class GUIElement extends EventObject {
    constructor(posX, posY, sizeX, sizeY, canvas, textureName) {
        super();
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
    _isInBoudingBox(posX, posY) {
        return posX >= this.posX && posX < this.posX + this.sizeX && posY >= this.posY && posY < this.posY + this.sizeY;
    }
}
//# sourceMappingURL=GUIElement.js.map