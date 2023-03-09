import AssetLoader from "../../AssetLoader.js";
import Canvas from "../../Canvas.js";
import EventObject from "../../EventObject.js";
import Texture from "../../textures/Texture.js";

export default class GUIElement extends EventObject
{
	posX: number;
	posY: number;
	sizeX: number;
	sizeY: number;

	textures = [];

	protected _texture: Texture;

	constructor(posX: number, posY: number, sizeX: number, sizeY: number, textureName: string)
	{
		super();

		this.posX = posX;
		this.posY = posY;
		this.sizeX = sizeX;
		this.sizeY = sizeY;

		this.setTexture(textureName);
	}

	setTexture(name: string)
	{
		if (this.textures.length)
			this.textures.pop();

		this._texture = AssetLoader.getTexture(name);

		this.textures.push(this._texture);
	}

	protected _isInBoudingBox(posX: number, posY: number): boolean
	{
		return posX >= this.posX && posX < this.posX + this.sizeX && posY >= this.posY && posY < this.posY + this.sizeY;
	}
}