export default class Scene {
    constructor(canvas) {
        this.renderObjects = [];
        this._canvas = canvas;
    }
    renderFrame(renderObjects = null, posX = 0, posY = 0) {
        if (!renderObjects)
            renderObjects = this.renderObjects;
        for (const object of renderObjects) {
            if (object.renderElement)
                object.renderElement(posX, posY, this._canvas);
            else {
                for (const texture of object.textures || [])
                    this._canvas.drawImage(texture, posX + object.posX || 0, posY + object.posY || 0);
            }
            if (object.renderObjects)
                this.renderFrame(object.renderObjects, posX + object.posX || 0, posY + object.posY || 0);
        }
    }
}
//# sourceMappingURL=Scene.js.map