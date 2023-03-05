import ImageAsset from "./ImageAsset.js";

export default
class AnimatedImageAsset extends ImageAsset
{
	frames: number;
	currentFrame = 0;

	private _canvasFrame = 0;
	private _framesPerImage = 1;
	private _subFrameCounter = 0;
	
	protected _frameImages: ImageBitmap[] = [];

	constructor(name: string, frames = 1, framesPerImage = 1)
	{
		super(name);
		this.frames = frames;
		this._framesPerImage = framesPerImage;
	}

	async loadAsset()
	{
		const data = await (await fetch(`assets/img/${ this.name }.png`)).blob();
		const image = await createImageBitmap(data);

		const frameHeight = Math.floor(image.height / this.frames);

		for (let i = 0; i < this.frames; i++)
			this._frameImages.push(await createImageBitmap(image, 0, i * frameHeight, image.width, frameHeight));

		this._image = this._frameImages[this.currentFrame];
		this.loaded = true;
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
		this.currentFrame++;
		if (this.currentFrame >= this.frames)
			this.currentFrame = 0;

		this._image = this._frameImages[this.currentFrame];
	}
}