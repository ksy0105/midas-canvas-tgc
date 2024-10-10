import {initCanvas} from '../common.ts';

const draw3_12_2 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);

    document.getElementById(canvasId)!.addEventListener('click', (e: MouseEvent) => {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        ctx.fillStyle = 'red';
        ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20);
    });
};

export default draw3_12_2;
