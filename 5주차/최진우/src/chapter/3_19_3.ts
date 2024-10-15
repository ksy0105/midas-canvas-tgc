import {initCanvas} from '../common.ts';

const draw3_19_3 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const ctxW = canvas.width;
    const ctxH = canvas.height;
    let x = ctxW / 2;
    let y = ctxH / 2;
    const vx = 10;
    let vy = -10;
    const gravity = 1;

    const animate = () => {
        x += vx;
        y += vy;
        vy += gravity;

        console.log(`x: ${x}, y: ${y}, vx: ${vx}, vy: ${vy}`);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctxW, ctxH);

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(x++, y += 0.5, 5, 0, Math.PI * 2);
        ctx.fill();

        if (x > ctxW) {
            x = ctxW / 2;
            y = ctxH / 2;
            vy = -10;
        }
    }

    setInterval(animate, 1000);
};

export default draw3_19_3;
