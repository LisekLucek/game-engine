import Canvas from "./Canvas.js";
import Texture from "./textures/Texture.js";

export interface RenderObject
{
	renderObjects?: RenderObject[];
	textures?: Texture[];
	posX?: number;
	posY?: number;

	/** Function used for overwriting dafault rendering behaviour */
	renderElement?(posX: number, posY: number, canvas: Canvas): void
}

export default
class Scene
{
	private _canvas: Canvas;
	renderObjects: RenderObject[] = [];

	constructor(canvas: Canvas)
	{
		this._canvas = canvas;
	}

	renderFrame(renderObjects: RenderObject[] = null, posX = 0, posY = 0)
	{
		if (!renderObjects)
			renderObjects = this.renderObjects;

		for (const object of renderObjects)
		{
			if (object.renderElement)
				object.renderElement(posX, posY, this._canvas);
			else
			{
				for (const texture of object.textures || [])
					this._canvas.drawImage(texture, posX + object.posX || 0, posY + object.posY || 0);
			}

			if (object.renderObjects)
				this.renderFrame(object.renderObjects, posX + object.posX || 0, posY + object.posY || 0);
		}
	}
}