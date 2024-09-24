import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 원 그리기
const execute3_3_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.stroke();
}

// 라운드 코너 그리기
const execute3_3_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.arcTo(350, 50, 350, 100, 50);
    ctx.lineTo(350, 200);
    ctx.stroke();
}

// quadraticCurve 그리기
const execute3_3_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.quadraticCurveTo(200, 100, 350, 100)
    ctx.lineTo(350, 200);
    ctx.stroke();
}

// bezierCurve 그리기
const execute3_3_4 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 4);

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.bezierCurveTo(200, 70, 100, 150, 350, 100);
    ctx.lineTo(350, 200);
    ctx.stroke();
}

const execute3_3 = () => {
    const id = 'chapter3_3'

    makeCanvasContainer(id, '3.3. 원 그리기');

    execute3_3_1(id);
    execute3_3_2(id);
    execute3_3_3(id);
    execute3_3_4(id);
}

export default execute3_3;