import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 사각형 그림자 그리기
const execute3_7_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 3;
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
}

const execute3_7 = () => {
    const id = 'chapter3_7'

    makeCanvasContainer(id, '3.7. 그림자 그리기');

    execute3_7_1(id);
}

export default execute3_7;