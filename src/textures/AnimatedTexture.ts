import Texture from "./Texture.js";

export default
class AnimatedTexture extends Texture
{
	private _currentFrame = 0;

	private _frames: number;
	private _framesPerImage = 1;
	private _duration = 1;
	private _looping = false;

	private _canvasFrame = 0;
	private _subFrameCounter = 0;
	
	protected _frameImages: ImageBitmap[] = [];

	constructor(imageData: ImageBitmap[], frames = 1, duration = 1, looping = false)
	{
		super(imageData[0]);
		this._frameImages = imageData;
		this._frames = frames;
		this._framesPerImage = Math.floor(duration / frames) || 0;
		this._duration = duration;
		this._looping = looping;
	}

	image(frame)
	{
		if (this._canvasFrame != frame)
		{
			this._canvasFrame = frame;
			this._subFrameCounter++;
			if (this._subFrameCounter >= this._framesPerImage)
			{
				this._subFrameCounter = 0;
				this.nextFrame();
			}
		}
		return this._image;
	}

	nextFrame()
	{
		this._currentFrame++;
		if (this._currentFrame >= this._frames)
			this._currentFrame = 0;

		this._image = this._frameImages[this._currentFrame];
	}
}