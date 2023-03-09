import Screen from "./GUI/Screen.js";
import { RenderObject } from "./Scene.js";

export default class GUI implements RenderObject
{
	renderObjects: RenderObject[] = [];

	private _currentScreen: Screen;

	loadScreen(screen: Screen)
	{
		this._currentScreen = screen;
		if (this.renderObjects.length)
			this.renderObjects.pop();

		this.renderObjects.push(screen);
	}
}