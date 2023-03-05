import AnimatedImageAsset from "./AnimatedImageAsset.js";
import EventObject from "./EventObject.js";
import ImageAsset from "./ImageAsset.js";
export default class Canvas extends EventObject {
    constructor(c) {
        super();
        this.mousePosX = 0;
        this.mousePosY = 0;
        this._assets = {};
        this.frame = 0;
        this.c = c;
        this.ctx = c.getContext("2d");
        this.ctx.font = "8px f6px";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.bindEvents();
    }
    drawImage(image, posX, posY) {
        this.ctx.drawImage(image.image(this.frame), posX, posY);
    }
    writeText(text, posX, posY, colour = "#FFF", align = "left", baseline = "top") {
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
        this.ctx.fillStyle = "#0008";
        this.ctx.fillText(text, posX + 1, posY - 2);
        this.ctx.fillText(text, posX, posY - 1);
        this.ctx.fillText(text, posX + 1, posY - 1);
        this.ctx.fillStyle = colour;
        this.ctx.fillText(text, posX, posY - 2);
    }
    //===== Assets management =====//
    addAsset(name, animated = false, frames = 1, framesPerImage = 1) {
        if (this._assets[name])
            return this._assets[name];
        console.log(`Added asset: ${name}`);
        if (!animated) {
            const asset = new ImageAsset(name);
            this._assets[name] = asset;
            return asset;
        }
        const asset = new AnimatedImageAsset(name, frames, framesPerImage);
        this._assets[name] = asset;
        return asset;
    }
    async loadAssets() {
        this.ctx.fillStyle = "#A00";
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);
        this.ctx.fillStyle = "#FFF";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "bottom";
        this.ctx.font = "8px pixelmix";
        this.ctx.fillText("Loading assets...", this.c.width / 2, this.c.height / 2);
        this.ctx.fillStyle = "#300";
        this.ctx.fillRect(10, this.c.height / 2 + 5, this.c.width - 20, 10);
        const assetsCount = Object.keys(this._assets).length;
        this.ctx.fillStyle = "#FFF";
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.font = "8px f6px";
        this.ctx.fillText(`0 / ${assetsCount}`, this.c.width - 10, this.c.height / 2 + 18);
        let i = 0;
        for (const name in this._assets) {
            const asset = this._assets[name];
            await asset.loadAsset();
            console.log(`Loaded asset: ${name}`);
            // Clearing text
            this.ctx.fillStyle = "#A00";
            this.ctx.fillRect(10, this.c.height / 2 + 16, this.c.width - 20, 10);
            // Filling progress bar
            this.ctx.fillStyle = "#FFF";
            this.ctx.fillRect(10, this.c.height / 2 + 5, Math.floor((this.c.width - 20) * ++i / assetsCount), 10);
            // Writting text
            this.ctx.textAlign = "right";
            this.ctx.fillText(`${i} / ${assetsCount}`, this.c.width - 10, this.c.height / 2 + 16);
            this.ctx.textAlign = "left";
            this.ctx.fillText(name, 10, this.c.height / 2 + 16);
        }
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }
    bindEvents() {
        const canvasAspectRatio = this.c.width / this.c.height;
        this.c.addEventListener("mousemove", e => {
            const windowAspectRatio = window.innerWidth / window.innerHeight;
            if (canvasAspectRatio > windowAspectRatio) {
                this.mousePosX = Math.floor(e.x * this.c.width / window.innerWidth);
                this.mousePosY = Math.floor((e.y - (window.innerHeight - window.innerWidth / canvasAspectRatio) / 2) * this.c.width / window.innerWidth);
            }
            else {
                this.mousePosX = Math.floor((e.x - (window.innerWidth - window.innerHeight * canvasAspectRatio) / 2) * this.c.height / window.innerHeight);
                this.mousePosY = Math.floor(e.y * this.c.height / window.innerHeight);
            }
            this._fireEvent("mousemove", this.mousePosX, this.mousePosY);
        });
        this.c.addEventListener("mousedown", () => {
            this._fireEvent("mousedown", this.mousePosX, this.mousePosY);
        });
        window.addEventListener("mouseup", () => {
            this._fireEvent("mouseup", this.mousePosX, this.mousePosY);
        });
    }
}
//# sourceMappingURL=Canvas.js.map