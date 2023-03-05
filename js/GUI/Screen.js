export default class Screen {
    constructor() {
        this.elements = [];
    }
    draw() {
        for (const element of this.elements)
            element.draw();
    }
}
