import { useRef } from "react";
import { useCanvas } from "../hooks/useCanvas";

const FireParticle = () => {
    const particles = useRef<{ x: number; y: number; size: number; vx: number; vy: number }[]>([]);
    const gravity = 1;
    const totalCount = 30;

    const ctxW = 400;
    const ctxH = 300;

    const addParticle = () => {
        if (particles.current.length >= totalCount) return;

        const x = ctxW / 2;
        const y = ctxH / 4;
        const size = 3;
        const vx = Math.random() * 20 - 10;
        const vy = Math.random() * 20 - 15;

        particles.current.push({ x, y, size, vx, vy });
    };

    const particle = (ctx: CanvasRenderingContext2D) => {
        addParticle();
        particles.current.forEach((particle, idx) => {
            ctx.beginPath();
            const grad = ctx.createLinearGradient(100, 0, 300, 0);
            grad.addColorStop(0, "white");
            grad.addColorStop(0.25, "yellow");
            grad.addColorStop(0.5, "red");
            grad.addColorStop(0.75, "yellow");
            grad.addColorStop(1, "white");
            ctx.fillStyle = grad;

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += gravity;

            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            if (particle.y > ctxH) {
                particles.current.splice(idx, 1);
            }
        });
    };

    const animate = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctxW, ctxH);
        particle(ctx);
    };

    const canvasRef = useCanvas(ctxW, ctxH, animate);

    return <canvas ref={canvasRef} width={ctxW} height={ctxH}>CANVAS를 지원하지 않습니다.</canvas>;
};

export default FireParticle;
