import GUIElement from "./GUIElements/GUIElement.js";

export default abstract class Screen
{
	elements: GUIElement[] = [];

	draw()
	{
		for (const element of this.elements)
			element.draw();
	}
}