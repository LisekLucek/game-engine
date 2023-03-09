import Canvas from "../Canvas.js";
import Screen from "./Screen.js";
import GUIElement from "./GUIElements/GUIElement.js";
import GUIButton from "./GUIElements/GUIButton.js";
import { RenderObject } from "../Scene.js";
import GUIInteractiveElement from "./GUIElements/GUIInteractiveElement.js";

export default class MainMenu extends Screen implements RenderObject
{
	renderObjects: RenderObject[] = [];

	constructor(canvas: Canvas)
	{
		super();

		const newGameButton = new GUIButton(134, 114, 92, 16, "New Game", canvas);
		const settingsButton   = new GUIButton(134, 136, 92, 16, "Settings", canvas);

		newGameButton.on("click", () =>
		{
			console.log("Clicked!");
		});

		this.renderObjects.push(newGameButton);
		this.renderObjects.push(settingsButton);

		// this.elements.push(newGameButton);
		// this.elements.push(settingsButton);
	}
}
