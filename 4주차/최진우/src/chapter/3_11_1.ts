import {initCanvas} from '../common.ts';

const draw3_11_1 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const ctxW = canvas.width;
    const ctxH = canvas.height;
    let x = 0;

    const animate = () => {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.fillStyle = 'red';
        ctx.fillRect(x, 10, 50, 50);
        x++;

        if (x > ctxW - 50) {
            x = 0;
        }
    };

    setInterval(animate, 30);
};

export default draw3_11_1;
