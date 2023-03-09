import EventObject from "./EventObject.js";
import ImageAsset, { ImageAssetData } from "./textures/ImageAsset.js";
import Texture from "./textures/Texture.js";

export default
class Canvas extends EventObject
{
	c: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	mousePosX: number = 0;
	mousePosY: number = 0;

	private _assets: { [name: string]: ImageAsset } = {};

	frame: number = 0;

	constructor(c: HTMLCanvasElement)
	{
		super();

		this.c = c;
		this.ctx = c.getContext("2d");

		this.ctx.font = "8px f6px";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";

		this._bindEvents();
	}

	drawImage(image: Texture, posX: number, posY: number)
	{
		try
		{
			this.ctx.drawImage(image.image(this.frame), posX, posY);
		}
		catch(e)
		{
			this.ctx.fillStyle = "#000";
			this.ctx.fillRect(posX, posY, 16, 16);
			this.ctx.fillStyle = "#F0F";
			this.ctx.fillRect(posX, posY, 8, 8);
			this.ctx.fillRect(posX + 8, posY + 8, 8, 8);
		}
	}

	writeText(text: string, posX: number, posY: number, colour: string = "#FFF", align: CanvasTextAlign = "left", baseline: CanvasTextBaseline = "top")
	{
		this.ctx.textAlign = align;
		this.ctx.textBaseline = baseline;

		this.ctx.fillStyle = "#0008";
		this.ctx.fillText(text, posX + 1, posY - 2);
		this.ctx.fillText(text, posX    , posY - 1);
		this.ctx.fillText(text, posX + 1, posY - 1);

		this.ctx.fillStyle = colour;
		this.ctx.fillText(text, posX, posY - 2);
	}


	private _bindEvents()
	{
		const canvasAspectRatio = this.c.width / this.c.height;

		this.c.addEventListener("mousemove", e =>
		{
			const windowAspectRatio = window.innerWidth / window.innerHeight;

			if (canvasAspectRatio > windowAspectRatio)
			{
				this.mousePosX = Math.floor(e.x * this.c.width / window.innerWidth);
				this.mousePosY = Math.floor((e.y - (window.innerHeight - window.innerWidth / canvasAspectRatio) / 2) * this.c.width / window.innerWidth);
			}
			else
			{
				this.mousePosX = Math.floor((e.x - (window.innerWidth - window.innerHeight * canvasAspectRatio) / 2) * this.c.height / window.innerHeight);
				this.mousePosY = Math.floor(e.y * this.c.height / window.innerHeight);
			}

			this._fireEvent("mousemove", this.mousePosX, this.mousePosY);
		});

		this.c.addEventListener("mousedown", () =>
		{
			this._fireEvent("mousedown", this.mousePosX, this.mousePosY);
		});

		window.addEventListener("mouseup", () =>
		{
			this._fireEvent("mouseup", this.mousePosX, this.mousePosY);
		});
	}
}
