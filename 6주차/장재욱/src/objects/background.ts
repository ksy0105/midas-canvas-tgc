import {loadImage} from "../utils/image.ts";

export default class Background {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement | null;

    constructor(ctx: CanvasRenderingContext2D) {
        this.x = 0;
        this.y = 0;
        this.ctx = ctx;
        this.image = null;
    }

    async loadImage() {
        this.image = await loadImage("./src/assets/space.png");
    }

    draw() {
        this.ctx.drawImage(this.image!, this.x--, 0);

        if (this.x <= -600) {
            this.x = 0;
        }
    }
}