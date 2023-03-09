import Texture from "./Texture.js";
export default class AnimatedTexture extends Texture {
    constructor(imageData, frames = 1, duration = 1, looping = false) {
        super(imageData[0]);
        this._currentFrame = 0;
        this._framesPerImage = 1;
        this._duration = 1;
        this._looping = false;
        this._canvasFrame = 0;
        this._subFrameCounter = 0;
        this._frameImages = [];
        this._frameImages = imageData;
        this._frames = frames;
        this._framesPerImage = Math.floor(duration / frames) || 0;
        this._duration = duration;
        this._looping = looping;
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
        this._currentFrame++;
        if (this._currentFrame >= this._frames)
            this._currentFrame = 0;
        this._image = this._frameImages[this._currentFrame];
    }
}
//# sourceMappingURL=AnimatedTexture.js.map