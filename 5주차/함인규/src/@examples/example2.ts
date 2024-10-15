import {CanvasExample} from "../@model/CanvasExample.ts";

class Particle {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isOutOfCanvas(canvasWidth: number, canvasHeight: number) {
        return this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight;
    }

    render(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createLinearGradient(100, 0, 300, 0);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.25, 'yellow');
        gradient.addColorStop(0.5, 'red');
        gradient.addColorStop(0.75, 'yellow');
        gradient.addColorStop(1, 'white');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    move(vx: number, vy: number) {
        this.x += vx;
        this.y += vy;
    }
}

class ParticleController {
    private GRAVITY:number = 1;

    private vx: number;
    private vy: number;

    private particle: Particle;

    constructor(particle: Particle, vx: number, vy: number) {
        this.vx = vx;
        this.vy = vy;
        this.particle = particle;
    }

    update() {
        this.particle.move(this.vx, this.vy);
        this.vy += this.GRAVITY;
    }

    getParticle() {
        return this.particle;
    }
}

class ParticlesController {
    private TOTAL_COUNT = 30;
    private initialParticlePosition;
    private $canvas: HTMLCanvasElement;
    private particleControllers: ParticleController[] = [];

    constructor($canvas: HTMLCanvasElement, initialParticlePosition: {x: number, y: number}) {
        this.$canvas = $canvas;
        this.initialParticlePosition = initialParticlePosition;
        this.particleControllers = [];
    }

    addParticle() {
        if(this.particleControllers.length >= this.TOTAL_COUNT) return;
        const newParticle = new Particle(this.initialParticlePosition.x, this.initialParticlePosition.y);
        this.particleControllers.push(new ParticleController(newParticle, Math.random() * 20 - 10, Math.random() * 20 - 15));
    }

    update() {
        this.particleControllers = this.particleControllers.filter(particle => !particle.getParticle().isOutOfCanvas(this.$canvas.width, this.$canvas.height));
        this.particleControllers.forEach(particle => {
            particle.update();
        });
    }

    render(ctx: CanvasRenderingContext2D) {
        this.particleControllers.forEach(particle => {
            particle.getParticle().render(ctx);
        });
    }
}

export default new CanvasExample(($canvas, ctx) => {
    let x = $canvas.width / 2;
    let y = $canvas.height / 4;

    const particlesController = new ParticlesController($canvas, {x, y});

    const renderBg = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    }

    const animate = () => {
        particlesController.addParticle();
        particlesController.update();

        renderBg();
        particlesController.render(ctx);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
});