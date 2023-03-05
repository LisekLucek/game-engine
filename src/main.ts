import AnimatedImageAsset from "./AnimatedImageAsset.js";
import Canvas from "./Canvas.js";
import GUI from "./GUI.js";
import MainMenu from "./GUI/MainMenu.js";

const canvas = new Canvas(<HTMLCanvasElement>document.getElementById("window"));
const gui = new GUI();

(async () =>
{
	canvas.ctx.fillStyle = "#FFF";
	canvas.ctx.fillRect(0, 0, canvas.c.width, canvas.c.height);
	const grass = canvas.addAsset("tile/grass");
	const rock = canvas.addAsset("tile/rock");
	const sand = canvas.addAsset("tile/sand");
	const water = <AnimatedImageAsset>canvas.addAsset("tile/water", true, 4, 25);

	const stop = canvas.addAsset("tile/stop");

	const walkingRight  = <AnimatedImageAsset>canvas.addAsset("tile/foxWalkingRight", true, 6, 5);
	const walkingLeft   = <AnimatedImageAsset>canvas.addAsset("tile/foxWalkingLeft", true, 6, 5);
	const idleRight     = <AnimatedImageAsset>canvas.addAsset("tile/foxIdleRight", true, 2, 50);
	const idleLeft      = <AnimatedImageAsset>canvas.addAsset("tile/foxIdleLeft", true, 2, 50);

	const treadmil = <AnimatedImageAsset>canvas.addAsset("tile/treadmil", true, 4, 3);
	

	// const pointer = canvas.addAsset("pointer");

	const mainMenu = new MainMenu(canvas);

	gui.loadScreen(mainMenu);

	await canvas.loadAssets();

	let fps        = 0;
	let currentFps = 0;

	setInterval(() =>
	{
		fps = currentFps;
		currentFps = 0;
	}, 1000);

	let posX = 12;
	let walkingDir = 0;
	document.body.addEventListener("keydown", e =>
	{
		switch (e.code)
		{
			case "ArrowRight": walkingDir = 4; break;
			case "ArrowLeft": walkingDir = 6; break;
		}
	});
	document.body.addEventListener("keyup", e =>
	{
		switch (e.code)
		{
			case "ArrowRight": walkingDir = 0; break;
			case "ArrowLeft": walkingDir = 2; break;
		}
	});

	setInterval(() =>
	{
		if (walkingDir == 4) posX++;
		if (walkingDir == 6) posX--;
	}, 40);

	const map =
	[
		"0000000000000000011111",
		"0000000000000000011111",
		"0000000000000000011111",
		"0000000000000000011111",
		"0000000000000000001111",
		"0000000000000000001111",
		"0000000000000000001111",
		"0000000000000000001111",
		"0000000000000000001111",
		"0000000000000000001111",
		"0000000000000000001111",
		"0000000000000000222211",
		"0000000000000002223333",
		"0000000000022222333333",
		"0000000002222333333333",
		"0000000222233333333333",
		"0000022222233333333333",
	];


	setInterval(() =>
	{
		for (let x = 0; x < 23; x++)
		for (let y = 0; y < 17; y++)
		{
			switch(map[y][x])
			{
				case "0":
					canvas.drawImage(grass, 16 * x, 16 * y);
					break;
				case "1":
					canvas.drawImage(rock, 16 * x, 16 * y);
					break;
				case "2":
					canvas.drawImage(sand, 16 * x, 16 * y);
					break;
				case "3":
					canvas.drawImage(water, 16 * x, 16 * y);
					break;
			}
		}
		
		canvas.drawImage(stop, 24, 12);

		canvas.drawImage(treadmil, 12, 42);
		
		switch(walkingDir)
		{
			case 0: canvas.drawImage(idleRight, posX, 24); break;
			case 2: canvas.drawImage(idleLeft,  posX, 24); break;
			case 4: canvas.drawImage(walkingRight, posX, 24); break;
			case 6: canvas.drawImage(walkingLeft, posX, 24); break;
		}
		


		gui.draw();

		// canvas.drawImage(pointer, canvas.mousePosX - 3, canvas.mousePosY - 3);

		// idle.nextFrame();

		canvas.writeText(`${ fps } FPS`, 356, 4, undefined, "right");

		canvas.frame++;
		currentFps++;
	}, 20);

})();
