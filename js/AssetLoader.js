import ImageAsset from "./textures/ImageAsset.js";
export default class AssetLoader {
    static async loadAssets(canvas = null) {
        const assetsList = await (await fetch("assets/img/textures.json")).json();
        const assetsCount = assetsList.length;
        if (canvas)
            this._showLoadingProgress(canvas, "", 0, assetsCount);
        let i = 0;
        for (const assetData of assetsList) {
            const assetName = typeof assetData == "string" ? assetData : assetData.name;
            const asset = new ImageAsset(assetData);
            this._imageAssets[assetName] = asset;
            await asset.loadAsset();
            if (canvas)
                this._showLoadingProgress(canvas, assetName, ++i, assetsCount);
            console.log(`Loaded asset: ${assetName}`);
        }
        if (canvas)
            canvas.ctx.clearRect(0, 0, canvas.c.width, canvas.c.height);
        this.loaded = true;
    }
    static _showLoadingProgress(canvas, assetName, assetNumber, assetsCount) {
        canvas.ctx.fillStyle = "#A00";
        canvas.ctx.fillRect(0, 0, canvas.c.width, canvas.c.height);
        canvas.ctx.fillStyle = "#FFF";
        canvas.ctx.textAlign = "center";
        canvas.ctx.textBaseline = "bottom";
        canvas.ctx.font = "8px pixelmix";
        canvas.ctx.fillText("Loading assets...", canvas.c.width / 2, canvas.c.height / 2);
        canvas.ctx.fillStyle = "#300";
        canvas.ctx.fillRect(10, canvas.c.height / 2 + 5, canvas.c.width - 20, 10);
        canvas.ctx.fillStyle = "#FFF";
        canvas.ctx.textAlign = "right";
        canvas.ctx.textBaseline = "top";
        canvas.ctx.font = "8px f6px";
        canvas.ctx.fillText(`0 / ${assetsCount}`, canvas.c.width - 10, canvas.c.height / 2 + 18);
        // Clearing text
        canvas.ctx.fillStyle = "#A00";
        canvas.ctx.fillRect(10, canvas.c.height / 2 + 16, canvas.c.width - 20, 10);
        // Filling progress bar
        canvas.ctx.fillStyle = "#FFF";
        canvas.ctx.fillRect(10, canvas.c.height / 2 + 5, Math.floor((canvas.c.width - 20) * assetNumber / assetsCount), 10);
        // Writting text
        canvas.ctx.textAlign = "right";
        canvas.ctx.fillText(`${assetNumber} / ${assetsCount}`, canvas.c.width - 10, canvas.c.height / 2 + 16);
        canvas.ctx.textAlign = "left";
        canvas.ctx.fillText(assetName, 10, canvas.c.height / 2 + 16);
    }
    static getTexture(name) {
        var _a;
        if (!this._imageAssets[name])
            console.log(`Unknown texure ${name}`);
        return ((_a = this._imageAssets[name]) === null || _a === void 0 ? void 0 : _a.getTexture()) || null;
    }
}
AssetLoader._imageAssets = {};
AssetLoader.loaded = false;
//# sourceMappingURL=AssetLoader.js.map