import { RenderObject } from "../Scene.js";
import Texture from "../textures/Texture.js";
import GUIElement from "./GUIElements/GUIElement.js";

export default abstract class Screen implements RenderObject
{
	textures: Texture[] = [];
	posX: number = 0;
	posY: number = 0;

	elements: GUIElement[] = [];
}