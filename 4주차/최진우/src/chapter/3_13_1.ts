import {initCanvas} from '../common.ts';

const draw3_13_1 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);
    const bg = new Image();

    bg.src = 'src/images/prague.png';
    let x = 0;

    const animate = () => {
        ctx.drawImage(bg, x--, 0);

        if(x <= -600) {
            x = 0;
        }
    }

    setInterval(animate, 30);
};

export default draw3_13_1;
