export default class ImageAsset {
    constructor(name) {
        this.loaded = false;
        this.name = name;
    }
    async loadAsset() {
        const data = await (await fetch(`assets/img/${this.name}.png`)).blob();
        this._image = await createImageBitmap(data);
        this.loaded = true;
    }
    image(_) { return this._image; }
}
