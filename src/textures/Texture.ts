export default
class Texture
{
	protected _image: ImageBitmap;

	constructor(imageData: ImageBitmap)
	{
		this._image = imageData;
	}

	image(_): ImageBitmap { return this._image; }
}