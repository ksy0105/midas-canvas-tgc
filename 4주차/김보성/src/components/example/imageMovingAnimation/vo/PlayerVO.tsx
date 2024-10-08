import player from "../../../../assets/iconChat.png";

export default class PlayerVO {
    img: HTMLImageElement;
    x: number = 30;
    y: number = 150;
    w: number = 0;
    h: number = 0;

    constructor(vo?: PlayerVO) {
        this.img = new Image();
        this.img.src = player;
        this.w = this.img.width;
        this.h = this.img.height;

        if(!vo) return;

        this.x = vo.x;
        this.y = vo.y;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img,this.x, this.y);
    }

}