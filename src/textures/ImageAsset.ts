import AnimatedTexture from "./AnimatedTexture.js";
import Texture from "./Texture.js";

export interface ImageAssetData
{
	name: string;
	frames?: number;
	duration?: number;
	looping?: boolean;
}

/**
 * Data ready to use for creating new texture instances
 */
export default
class ImageAsset
{
	name: string;
	
	frames: number = 0;
	framesPerImage: number = 0;
	duration: number = 0;
	looping: boolean = false;

	loaded: boolean = false;

	private _image: ImageBitmap;
	private _imageFrames: ImageBitmap[] = [];


	constructor(imageData: string | ImageAssetData)
	{
		if (typeof imageData == "string")
			this.name = imageData;
		else
		{
			this.name = imageData.name;
			this.frames = imageData.frames || 0;
			this.duration = imageData.duration || 0;
			this.looping = imageData.looping || false;
		}
	}

	get animated(): boolean { return this.frames > 0; };

	async loadAsset()
	{
		const data = await (await fetch(`assets/img/${ this.name }.png`)).blob();
		this._image = await createImageBitmap(data);

		if (this.animated)
		{
			const frameHeight = Math.floor(this._image.height / this.frames);

			for (let i = 0; i < this.frames; i++)
				this._imageFrames.push(await createImageBitmap(this._image, 0, i * frameHeight, this._image.width, frameHeight));
		}

		this.loaded = true;
	}

	getTexture()
	{
		if (!this.animated)
			return new Texture(this._image);
		else
			return new AnimatedTexture(this._imageFrames, this.frames, this.duration, this.looping);
	}
}