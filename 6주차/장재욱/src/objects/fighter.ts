import {loadImage} from "../utils/image.ts";

export default class Fighter {
    x: number;
    y: number;
    speed: number;
    ctx: CanvasRenderingContext2D;
    bodyImage: HTMLImageElement | null;
    laserImage: HTMLImageElement | null;
    keysDown: {
        [key: string]: boolean
    };
    lasers: number[][];
    laserTotal: number;
    boolFireExplosion: boolean;
    laserSound: HTMLAudioElement;
    explodeSound: HTMLAudioElement;

    constructor(x: number, y: number, speed: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.ctx = ctx;
        this.bodyImage = null;
        this.laserImage = null;
        this.keysDown = {};
        this.lasers = [];
        this.laserTotal = 10;
        this.boolFireExplosion = false;
        this.laserSound = new Audio("./src/assets/Laser.wav");
        this.explodeSound = new Audio("./src/assets/explosion.wav");
    }

    init() {
        this.ctx.drawImage(this.bodyImage!, -50, 0);
    }

    async loadImage() {
        const [bodyImage, laserImage] = await Promise.all([
            loadImage("./src/assets/fighter.png"), loadImage("./src/assets/laser.png")
        ])

        this.bodyImage = bodyImage;
        this.laserImage = laserImage;
    }

    private keyDownEventListener = (event: KeyboardEvent) => {
        this.keysDown[event.code] = true;

        if (event.code === 'Space' && this.lasers.length <= this.laserTotal) {
            this.lasers.push([this.x + 50, this.y + 10]);
            this.laserSoundPlay();
        }
    }
    private keyUpEventListener = (event: KeyboardEvent) => {
        delete this.keysDown[event.code];
    }

    draw() {
        // 비행기 그리기
        if (this.boolFireExplosion) {
            this.ctx.drawImage(this.bodyImage!, this.x += 1, this.y);
            if (this.x >= 50) {
                this.boolFireExplosion = false;
            }
        } else {
            this.ctx.drawImage(this.bodyImage!, this.x, this.y);
        }

        // 레이저 그리기
        if (this.lasers.length) {
            for (let i = 0; i < this.lasers.length; i++) {
                this.ctx.drawImage(this.laserImage!, this.lasers[i][0], this.lasers[i][1])
            }
        }
        this.moveLaser();
    }

    addKeyboardEventListener() {
        document.addEventListener('keydown', this.keyDownEventListener, false);
        document.addEventListener('keyup', this.keyUpEventListener, false);
    }

    deleteKeyboardEventListener() {
        document.removeEventListener('keydown', this.keyDownEventListener);
        document.removeEventListener('keyup', this.keyUpEventListener);
    }

    update() {
        // w
        if ('KeyW' in this.keysDown) this.y -= this.speed;
        // s
        if ('KeyS' in this.keysDown) this.y += this.speed;
        // a
        if ('KeyA' in this.keysDown) this.x -= this.speed;
        // d
        if ('KeyD' in this.keysDown) this.x += this.speed;

        if (this.ctx) {
            if (this.x <= 0) this.x = 0;
            if (this.x >= this.ctx.canvas.width - 60) this.x = this.ctx.canvas.width - 60;
            if (this.y <= 0) this.y = 0;
            if (this.y >= this.ctx.canvas.height - 30) this.y = this.ctx.canvas.height - 30;
        }
    }

    moveLaser() {
        for(let i = 0; i < this.lasers.length; i ++) {
            if (this.lasers[i][0] > 0) {
                this.lasers[i][0] += 20;
            }

            if (this.lasers[i][1] > 600) {
                this.lasers.splice(i, 1);
            }
        }
    }

    reset() {
        this.x = 0;
        this.y = this.ctx.canvas.height / 2;
    }

    laserSoundPlay() {
        this.laserSound.volume = 0.12;
        this.laserSound.load();
        this.laserSound.play();
    }

    explodeSoundPlay() {
        this.explodeSound.load();
        this.explodeSound.play();
    }
}