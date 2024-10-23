import {loadImage} from "../utils/image.ts";

type HitExplosion = {
    x: number;
    y: number;
}

export default class Asteroid {
    x: number;
    y: number;
    speed: number;
    ctx: CanvasRenderingContext2D;
    image: HTMLImageElement | null;
    randScale: number;
    ang: number;
    arrScale = [0.4, 0.6, 0.8, 1];
    explodeImage: HTMLImageElement | null;
    spriteCount: number;
    hitExplosion: HitExplosion;
    boolHitExplosion: boolean;
    explodeSound: HTMLAudioElement;

    constructor(ctx: CanvasRenderingContext2D) {
        this.x = ctx.canvas.width;
        this.y = Math.floor(Math.random() * 350);
        this.speed = 10;
        this.ctx = ctx;
        this.image = null;
        this.ang = 0;
        this.randScale = 0;
        this.explodeImage = null;
        this.spriteCount = 1;
        this.hitExplosion = {x: 0, y: 0};
        this.boolHitExplosion = false;
        this.explodeSound = new Audio("./src/assets/explosion-02.wav");
    }

    async loadImage() {
        const [image, explodeImage] = await Promise.all([
            loadImage("./src/assets/asteroid.png"), loadImage("./src/assets/explode.png")
        ])

        this.image = image;
        this.explodeImage = explodeImage;
    }

    drawExplode() {
        this.ctx.drawImage(this.explodeImage!, this.spriteCount * 39, 0, 39, 40, this.hitExplosion.x, this.hitExplosion.y, 39 * (1 + this.randScale), 40 * (1 + this.randScale));

        this.spriteCount++;
        if (this.spriteCount > 13) {
            this.spriteCount = 1;
            this.boolHitExplosion = false;
        }
    }

    draw() {
        const w = this.image!.width * this.randScale;
        const h = this.image!.height * this.randScale;
        const coordX = (this.image!.width / 2) * this.randScale;
        const coordY = (this.image!.height / 2) * this.randScale;

        this.ctx.save();
        this.ctx.translate(this.x + coordX, this.y + coordY);
        this.ctx.rotate(Math.PI / 180 * (this.ang += 5));
        this.ctx.translate(-this.x - coordX, -this.y - coordY);

        this.ctx.drawImage(this.image!, this.x -= this.speed, this.y, w, h);

        this.ctx.restore();

        if (this.x <= -100) this.reset();
    }

    shuffle(arr: number[]) {
        const rand = Math.floor((Math.random() * arr.length));
        return arr[rand];
    }

    reset() {
        this.speed = Math.floor((Math.random() * 5)) + 5;
        this.x = this.ctx.canvas.width;
        this.y = Math.floor(Math.random() * 350);

        if (this.y < 40) this.y = 40;
        if (this.y > 360) this.y = 360;

        this.randScale = this.shuffle(this.arrScale);
    }

    explodeSoundPlay() {
        this.explodeSound.load();
        this.explodeSound.play();
    }
}