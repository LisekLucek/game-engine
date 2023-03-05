import Canvas from "../../Canvas.js";
import GUIElement from "./GUIElement.js";

export default class GUIInteractiveElement extends GUIElement
{
	private _hoverable: boolean = false;
	hovering: boolean = false;

	private _clickable: boolean = false;
	pressed: boolean = false;

	constructor(posX: number, posY: number, sizeX: number, sizeY: number, canvas: Canvas, textureName: string | string[])
	{
		super(posX, posY, sizeX, sizeY, canvas, textureName);
	}

	on(event: string, callback: Function)
	{
		super.on(event, callback);

		switch (event)
		{
			case "hover":
			case "hoverLeave":
				if (!this._hoverable)
					this._canvas.on("mousemove", (posX, posY) => this._checkHoverState(posX, posY));
				break;
			case "click":
			case "press":
			case "release":
				if (!this._clickable)
				{
					this._canvas.on("mousedown", (posX, posY) => this._checkClickState(posX, posY));
					this._canvas.on("mouseup",   (posX, posY) => this._checkClickState(posX, posY, false));
				}
				break;
		}
	}

	private _checkHoverState(posX: number, posY: number)
	{
		if (this._isInBoudingBox(posX, posY))
		{
			if (!this.hovering)
			{
				this.hovering = true;
				this._fireEvent("hover");
			}
		}
		else
		{
			if (this.hovering)
			{
				this.hovering = false;
				this._fireEvent("hoverLeave");
			}
		}
	}

	private _checkClickState(posX: number, posY: number, pressed: boolean = true)
	{
		if (!pressed && this.pressed)
			this._fireEvent("release");

		if (this._isInBoudingBox(posX, posY))
		{
			if (!pressed && this.pressed)
				this._fireEvent("click");

			if (pressed && !this.pressed)
				this._fireEvent("press");

			this.pressed = pressed;
		}
		else
			this.pressed = false;

	}
}