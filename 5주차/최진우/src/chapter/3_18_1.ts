import {initCanvas} from '../common.ts';

const draw3_18_1 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;

    const bgImg = new Image();
    bgImg.src = 'src/images/winternight.jpg';

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);
        ctx.drawImage(bgImg, 0, 0);
    }

    setInterval(animate, 30);
};

export default draw3_18_1;
