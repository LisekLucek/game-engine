import Screen from "./GUI/Screen.js";

export default class GUI
{
	private _currentScreen: Screen;

	loadScreen(screen: Screen)
	{
		this._currentScreen = screen;
	}

	draw()
	{
		this._currentScreen.draw();
	}
}