import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 사각형 그리기
const execute3_2_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.strokeRect(20, 20, 100, 100);
    ctx.fillStyle = "magenta";
    ctx.fillRect(150, 150, 50, 50);
    ctx.strokeRect(150, 150, 50, 50);
}

// 내부가 채워진 사각형 그리기
const execute3_2_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    ctx.fillStyle = "magenta";
    ctx.fillRect(20, 20, 100, 100);
    ctx.strokeRect(20, 20, 100, 100);

    ctx.fillStyle = "green";
    ctx.fillRect(150, 150, 50, 50);
    ctx.strokeRect(150, 150, 50, 50);
}

// 내부를 사각형으로 지우기
const execute3_2_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    ctx.lineWidth = 20;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 200, 200);
    ctx.strokeRect(50, 50, 200, 200);
    ctx.clearRect(70, 70, 100, 50);
}

const execute3_2 = () => {
    const id = 'chapter3_2'

    makeCanvasContainer(id, '3.2. 사각형 그리기');

    execute3_2_1(id);
    execute3_2_2(id);
    execute3_2_3(id);
}

export default execute3_2;