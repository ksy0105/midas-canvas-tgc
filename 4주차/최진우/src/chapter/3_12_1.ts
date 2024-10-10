import {initCanvas} from '../common.ts';

const draw3_12_1 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);

    document.getElementById(canvasId)!.addEventListener('click', (e: MouseEvent) => {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'italic bold 40px Arial, sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(`X: ${mouseX}, Y: ${mouseY}`, 10, 10);
    });
};

export default draw3_12_1;
