import {initCanvas} from '../common.ts';

const draw3_18_3 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;

    const bgImg = new Image();
    bgImg.src = 'src/images/winternight.jpg';

    const snowX = Math.floor(Math.random() * canW) + 1;
    let snowY = 0;
    const snowSize = Math.floor(Math.random() * 3) + 1;

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);
        ctx.drawImage(bgImg, 0, 0);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(snowX, snowY++, snowSize, 0, Math.PI * 2);
        ctx.fill();

        if(snowY > canH) {
            snowY = 0;
        }
    }

    setInterval(animate, 30);
};

export default draw3_18_3;
