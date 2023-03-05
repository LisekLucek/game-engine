export default
class ImageAsset
{
	name: string;
	loaded: boolean = false;

	protected _image: ImageBitmap;


	constructor(name: string)
	{
		this.name = name;
	}

	async loadAsset()
	{
		const data = await (await fetch(`assets/img/${ this.name }.png`)).blob();
		this._image = await createImageBitmap(data);
		this.loaded = true;
	}

	image(_) { return this._image; }
}