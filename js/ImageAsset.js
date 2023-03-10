/**
 * Data ready to use for creating new texture instances
 */
export default class ImageAsset {
    constructor(imageData) {
        this.frames = 0;
        this.framesPerImage = 0;
        this.duration = 0;
        this.looping = false;
        this.loaded = false;
        if (typeof imageData == "string")
            this.name = imageData;
        else {
            this.name = imageData.name;
            this.frames = imageData.frames || 0;
            this.framesPerImage = Math.floor(imageData.duration / imageData.frames) || 0;
            this.duration = imageData.duration || 0;
            this.looping = imageData.looping || false;
        }
    }
    get animated() { return this.frames > 0; }
    ;
    async loadAsset() {
        const data = await (await fetch(`assets/img/${this.name}.png`)).blob();
        this._image = await createImageBitmap(data);
        this.loaded = true;
    }
    getTexture() {
    }
    image(_) { return this._image; }
}
//# sourceMappingURL=ImageAsset.js.map