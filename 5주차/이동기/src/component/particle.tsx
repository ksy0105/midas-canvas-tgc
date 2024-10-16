import { useState, useEffect, useRef } from "react";
import { useCanvas } from "../hooks/useCanvas";

const Particle = () => {
    const snowMakes = useRef<{ x: number; y: number; size: number }[]>([]);
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const bgImg = useRef<HTMLImageElement>(new Image());
    const totalCount = 350;

    useEffect(() => {
        const image = bgImg.current;
        image.src = '/winternight.jpg';
        image.onload = () => setIsImgLoaded(true);
    }, []);

    const ctxW = bgImg.current.width + 100;
    const ctxH = bgImg.current.height + 100;

    const addSnowMake = () => {
        if (snowMakes.current.length >= totalCount) return;

        const x = Math.floor(Math.random() * ctxW) - 100;
        const y = 0;
        const size = Math.floor(Math.random() * 3) + 1;

        snowMakes.current.push({ x, y, size });
    };

    const snow = (ctx: CanvasRenderingContext2D) => {
        addSnowMake();
        ctx.fillStyle = 'rgba(255,255,255,0.75)';

        snowMakes.current.forEach((item, idx) => {
            ctx.beginPath();
            item.y += item.size * 0.5;
            ctx.arc(item.x, item.y, item.size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            if (item.y > ctxH) {
                snowMakes.current.splice(idx, 1);
            }
        });
    };

    const displayCount = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial, Sans-serif';
        ctx.fillText(`${snowMakes.current.length}`, 10, 20);
    };

    const animate = (ctx: CanvasRenderingContext2D) => {
        if (!isImgLoaded) return;

        ctx.save();
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImg.current, 0, 0);
        displayCount(ctx);

        ctx.rotate(-0.2);
        snow(ctx);
        ctx.restore();
    };

    const canvasRef = useCanvas(bgImg.current.width, bgImg.current.height, animate);

    return <canvas ref={canvasRef} />;
};

export default Particle;