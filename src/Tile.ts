import { RenderObject } from "./Scene.js";
import Texture from "./textures/Texture.js";

export default
class Tile implements RenderObject
{
	textures?: Texture[] = [];
	posX: number;
	posY: number;

	constructor(type: string, texture: Texture, posX = 0, posY = 0)
	{
		this.textures.push(texture);
		this.posX = posX;
		this.posY = posY;
	}
}