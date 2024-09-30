import {initCanvas} from '../common.ts';

const draw3_11_1 = (subTitle: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, canvasId);

    ctx.fillStyle = "rgba(63, 169, 245, 1)";
    ctx.fillRect(20, 20, 100, 100);
    ctx.globalAlpha = 0.5; // globalAlpha 값 지정 이후 요소들은 모두 알파값 적용됨
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 100);
};

export default draw3_11_1;
