import Canvas from "./Canvas.js";
import GUI from "./GUI.js";
import MainMenu from "./GUI/MainMenu.js";
import Scene from "./Scene.js";
import World from "./World.js";
import AssetLoader from "./AssetLoader.js";

const canvas = new Canvas(<HTMLCanvasElement>document.getElementById("window"));
const scene = new Scene(canvas);
const gui = new GUI();


(async () =>
{
	await AssetLoader.loadAssets(canvas);

	const world = new World();
	scene.renderObjects.push(world);
	scene.renderObjects.push(gui);

	// TODO
	const mainMenu = new MainMenu(canvas);

	gui.loadScreen(mainMenu);

	let fps        = 0;
	let currentFps = 0;

	setInterval(() =>
	{
		fps = currentFps;
		currentFps = 0;
	}, 1000);

	// let posX = 12;
	// let walkingDir = 0;
	// document.body.addEventListener("keydown", e =>
	// {
	// 	switch (e.code)
	// 	{
	// 		case "ArrowRight": walkingDir = 4; break;
	// 		case "ArrowLeft": walkingDir = 6; break;
	// 	}
	// });
	// document.body.addEventListener("keyup", e =>
	// {
	// 	switch (e.code)
	// 	{
	// 		case "ArrowRight": walkingDir = 0; break;
	// 		case "ArrowLeft": walkingDir = 2; break;
	// 	}
	// });

	// setInterval(() =>
	// {
	// 	if (walkingDir == 4) posX++;
	// 	if (walkingDir == 6) posX--;
	// }, 40);

	setInterval(() =>
	{
	
		scene.renderFrame();

		canvas.writeText(`${ fps } FPS`, 356, 4, undefined, "right");

		canvas.frame++;
		currentFps++;
	}, 20);

})();
