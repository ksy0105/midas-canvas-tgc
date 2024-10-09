import background from "../../../../assets/background.png";

export default class BackgroundVO {
    img: HTMLImageElement;
    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;

    constructor() {
        this.img = new Image();
        this.img.src = background;
        this.w = this.img.width;
        this.h = this.img.height;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img,this.x--, 0);

        if(this.x <= 600){
            this.x = 0;
        }
    }

}