import Canvas from "../../Canvas.js";
import EventObject from "../../EventObject.js";
import ImageAsset from "../../ImageAsset.js";

export default class GUIElement extends EventObject
{
	posX: number;
	posY: number;
	sizeX: number;
	sizeY: number;

	protected _canvas: Canvas;
	private _texture: ImageAsset;

	constructor(posX: number, posY: number, sizeX: number, sizeY: number, canvas: Canvas, textureName: string | string[])
	{
		super();

		this.posX = posX;
		this.posY = posY;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this._canvas = canvas;
		
		if (typeof textureName != "string")
		{
			this._texture = canvas.addAsset(textureName.shift());

			for (const texture of textureName)
			{
				canvas.addAsset(texture);
			}
		}
		else
			this._texture = canvas.addAsset(textureName);
	}

	draw()
	{
		this._canvas.drawImage(this._texture, this.posX, this.posY);
	}

	setTexture(name: string)
	{
		this._texture = this._canvas.addAsset(name);
	}

	protected _isInBoudingBox(posX: number, posY: number): boolean
	{
		return posX >= this.posX && posX < this.posX + this.sizeX && posY >= this.posY && posY < this.posY + this.sizeY;
	}
}