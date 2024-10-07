import {CanvasExample} from "../@model/CanvasExample.ts";

// 배경과 비행기 같이 띄우기
class Background {
    x: number;
    y: number;
    width: number;
    height: number;
    img: HTMLImageElement;
    constructor(x: number, y: number, width: number, height: number, src: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = src;
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x--, 0, 400, 300); //이미지 그리기
        ctx.drawImage(this.img, this.x + 400, 0, 400, 300); //연속적인 이미지 그리기
        if(this.x <= -400) { //이미지가 화면을 벗어나면
            this.x = 0; //이미지를 다시 0으로 초기화
        }
    }
}

class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    img: HTMLImageElement;
    constructor(x: number, y: number, width: number, height: number, src: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = src;
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
export default new CanvasExample((_, ctx) => {
    const background = new Background(0, 0, 400, 300, '/space_bg.png');
    const player = new Player(30, 120, 30, 30, '/fighter.png');

    const animate = () => {
        background.render(ctx);
        player.render(ctx);
    };

    setInterval(animate, 30);
});