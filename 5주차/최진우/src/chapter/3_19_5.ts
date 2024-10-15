import {initCanvas} from '../common.ts';

const draw3_19_5 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const ctxW = canvas.width;
    const ctxH = canvas.height;

    type ParticleType = {
        x: number;
        y: number;
        size: number;
        vx: number;
        vy: number;
    }

    const particles: ParticleType[] = [];
    const totalCount = 30;

    const gravity = 1;

    const addParticle = () => {
        if (particles.length >= totalCount) {
            return;
        }

        let x = ctxW / 2;
        let y = ctxH / 4;
        const size = 3;
        const vx = Math.random() * 20 - 10;
        const vy = Math.random() * 20 - 15;

        particles.push({'x': x, 'y': y, 'size': size, 'vx': vx, 'vy': vy});
    }

    const particle = () => {
        addParticle();

        for(let i = 0; i < particles.length; i++) {
            ctx.beginPath();

            const grad = ctx.createLinearGradient(100, 0, 300, 0);
            grad.addColorStop(0, 'white');
            grad.addColorStop(0.25, 'yellow');
            grad.addColorStop(0.5, 'red');
            grad.addColorStop(0.75, 'yellow');
            grad.addColorStop(1, 'white');
            ctx.fillStyle = grad;

            const x = particles[i].x += particles[i].vx;
            const y = particles[i].y += particles[i].vy;

            particles[i].vy += gravity;
            ctx.arc(x, y, particles[i].size, 0, Math.PI * 2);
            ctx.fill();

            if(particles[i].y > ctxH) {
                particles.splice(i, 1);
            }
        }
    }

    const animate = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctxW, ctxH);

        particle()
    }

    setInterval(animate, 30);
};

export default draw3_19_5;
