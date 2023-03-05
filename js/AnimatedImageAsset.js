import ImageAsset from "./ImageAsset.js";
export default class AnimatedImageAsset extends ImageAsset {
    constructor(name, frames = 1, framesPerImage = 1) {
        super(name);
        this.currentFrame = 0;
        this._canvasFrame = 0;
        this._framesPerImage = 1;
        this._subFrameCounter = 0;
        this._frameImages = [];
        this.frames = frames;
        this._framesPerImage = framesPerImage;
    }
    async loadAsset() {
        const data = await (await fetch(`assets/img/${this.name}.png`)).blob();
        const image = await createImageBitmap(data);
        const frameHeight = Math.floor(image.height / this.frames);
        for (let i = 0; i < this.frames; i++)
            this._frameImages.push(await createImageBitmap(image, 0, i * frameHeight, image.width, frameHeight));
        this._image = this._frameImages[this.currentFrame];
        this.loaded = true;
    }
    image(frame) {
        if (this._canvasFrame != frame) {
            this._canvasFrame = frame;
            this._subFrameCounter++;
            if (this._subFrameCounter >= this._framesPerImage) {
                this._subFrameCounter = 0;
                this.nextFrame();
            }
        }
        return this._image;
    }
    nextFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.frames)
            this.currentFrame = 0;
        this._image = this._frameImages[this.currentFrame];
    }
}
//# sourceMappingURL=AnimatedImageAsset.js.map