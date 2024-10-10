import {initCanvas} from '../common.ts';

const draw3_11_2 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const ctxW = canvas.width;
    const ctxH = canvas.height;
    let x = 0;
    let y = 0;

    const animate = () => {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.fillStyle = 'red';
        ctx.fillRect(x, 10, 50, 50);
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, y, 50, 50);
        x++;
        y++;

        if (x > ctxW - 50) {
            x = 0;
        }

        if (y > ctxH - 50)  {
            y = 0;
        }
    };

    const animateInterval = setInterval(animate, 30);

    document.querySelector(`#${canvasId}`)!.addEventListener('click', () => {
        clearInterval(animateInterval);
    });
};

export default draw3_11_2;
