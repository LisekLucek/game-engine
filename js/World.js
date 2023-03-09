import AssetLoader from "./AssetLoader.js";
import Tile from "./Tile.js";
const map = [
    "00000000000000000111111",
    "00000000000000000111111",
    "00000000000000000111111",
    "00000000000000000111111",
    "00000000000000000011111",
    "00000000000000000011111",
    "00000000000000000011111",
    "00000000000000000011111",
    "00000000000000000011111",
    "00000000000000000011111",
    "00000000000000000011111",
    "00000000000000002222111",
    "00000000000000022233331",
    "00000000000222223333333",
    "00000000022223333333333",
    "00000002222333333333333",
    "00000222222333333333333",
];
export default class World {
    constructor() {
        this.renderObjects = [];
        const grass = AssetLoader.getTexture("tile/grass");
        const rock = AssetLoader.getTexture("tile/rock");
        const sand = AssetLoader.getTexture("tile/sand");
        const water = AssetLoader.getTexture("tile/water");
        for (let x = 0; x < 23; x++)
            for (let y = 0; y < 17; y++) {
                let tileType = null;
                switch (map[y][x]) {
                    case "0":
                        tileType = grass;
                        break;
                    case "1":
                        tileType = rock;
                        break;
                    case "2":
                        tileType = sand;
                        break;
                    case "3":
                        tileType = water;
                        break;
                }
                this.renderObjects.push(new Tile("", tileType, x * 16, y * 16));
            }
    }
}
//# sourceMappingURL=World.js.map