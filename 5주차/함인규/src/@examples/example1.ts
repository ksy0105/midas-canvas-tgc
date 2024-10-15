//알파값 지정하기
import {CanvasExample} from "../@model/CanvasExample.ts";

// 배경 클래스
class Background {
    private img: HTMLImageElement;
    private width: number;
    private height: number;

    constructor(width: number, height: number, src: string) {
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = src;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, 0, 0, this.width, this.height); // 이미지 그리기
    }
}


class Snow {
    private fillStyle:string = "rgba(255, 255, 255, 0.75)";
    private x: number;
    private y: number;
    private radius: number;

    constructor(x:number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    getSize() {
        return this.radius;
    }

    isOutOfCanvas(canvasHeight: number) {
        return  this.y > canvasHeight;
    }

    render(ctx : CanvasRenderingContext2D) {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }
}

class SnowController {
    private snow: Snow;
    private speed: number;
    private canvasHeight: number;

    constructor(snow: Snow, speed: number, canvasHeight: number) {
        this.snow = snow;
        this.speed = speed;
        this.canvasHeight = canvasHeight;
    }

    isOutOfCanvas() {
        return this.snow.isOutOfCanvas(this.canvasHeight);
    }

    public update(deltaTime: number) {
        const distance = this.speed * deltaTime;
        this.snow.move(0, distance);
    }

    public getSnow() {
        return this.snow;
    }
}

class SnowflakeController {
    private snowControllers: SnowController[] = [];

    constructor(snowControllers: SnowController[]) {
        this.snowControllers = snowControllers;
    }

    public addSnowController(snowController: SnowController) {
        this.snowControllers.push(snowController);
    }

    public update(deltaTime: number) {
        this.snowControllers.forEach(snowflake => snowflake.update(deltaTime));
        this.snowControllers = this.snowControllers.filter(snowflake => !snowflake.isOutOfCanvas());
    }

    public getSnowflakes() {
        return this.snowControllers;
    }
}

export default new CanvasExample(($canvas, ctx) => {
    let lastTime = 0;
    const ctxW = $canvas.width + 100;
    const ctxH = $canvas.height + 100;
    const bgImage = new Background($canvas.width, $canvas.height, '/winternight.jpg');

    const snowflakeController = new SnowflakeController([]);

    const displayCount = () => {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.fillText(snowflakeController.getSnowflakes().length.toString(), 10, 20);
    }

    const animate = (currentTime: number) => {
        const deltaTime = (currentTime - lastTime) / 1000; // deltaTime을 초 단위로 계산
        lastTime = currentTime;

        ctx.save();
        ctx.clearRect(0, 0, $canvas.width, $canvas.height); // 화면 지우기
        const newSnow = new Snow(Math.floor(Math.random() * ctxW) - 100, 0, Math.floor(Math.random() * 3) + 1);
        const newSnowSpeed = newSnow.getSize() * 10;
        snowflakeController.addSnowController(new SnowController(newSnow, newSnowSpeed, ctxH));

        snowflakeController.update(deltaTime);

        bgImage.render(ctx);
        displayCount();

        ctx.rotate(-0.2);
        snowflakeController.getSnowflakes().forEach(snowflake => snowflake.getSnow().render(ctx));
        ctx.restore();

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
});