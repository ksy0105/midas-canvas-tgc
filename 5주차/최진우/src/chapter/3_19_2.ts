import {initCanvas} from '../common.ts';

const draw3_19_2 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const ctxW = canvas.width;
    const ctxH = canvas.height;
    let x = 200;
    let y = 150;

    const animate = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctxW, ctxH);

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(x++, y += 0.5, 5, 0, Math.PI * 2);
        ctx.fill();

        if (x > ctxW) {
            x = 200;
            y = 150;
        }
    }

    setInterval(animate, 30);
};

export default draw3_19_2;
