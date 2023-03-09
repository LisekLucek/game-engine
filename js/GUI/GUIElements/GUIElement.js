import AssetLoader from "../../AssetLoader.js";
import EventObject from "../../EventObject.js";
export default class GUIElement extends EventObject {
    constructor(posX, posY, sizeX, sizeY, textureName) {
        super();
        this.textures = [];
        this.posX = posX;
        this.posY = posY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.setTexture(textureName);
    }
    setTexture(name) {
        if (this.textures.length)
            this.textures.pop();
        this._texture = AssetLoader.getTexture(name);
        this.textures.push(this._texture);
    }
    _isInBoudingBox(posX, posY) {
        return posX >= this.posX && posX < this.posX + this.sizeX && posY >= this.posY && posY < this.posY + this.sizeY;
    }
}
//# sourceMappingURL=GUIElement.js.map