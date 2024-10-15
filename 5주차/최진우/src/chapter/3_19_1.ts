import {initCanvas} from '../common.ts';

const draw3_19_1 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(200, 150, 5, 0, Math.PI * 2);
    ctx.fill();
};

export default draw3_19_1;
