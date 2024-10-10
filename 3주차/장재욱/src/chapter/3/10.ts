import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 알파값 적용하기
const execute3_10_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.fillStyle = "rgba(63, 169, 245, 1)";
    ctx.fillRect(20, 20, 100, 100);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 100);
}

// 두 개의 이미지를 합성하여 그리기
const execute3_10_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    ctx.fillStyle = "rgba(63, 169, 245, 1)";
    ctx.fillRect(20, 20, 100, 100);
    ctx.globalCompositeOperation = "xor";
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 100);
}

const execute3_10 = () => {
    const id = 'chapter3_10'

    makeCanvasContainer(id, '3.10. 합성하기', () => {
        execute3_10_1(id);
        execute3_10_2(id);
    });
}

export default execute3_10;