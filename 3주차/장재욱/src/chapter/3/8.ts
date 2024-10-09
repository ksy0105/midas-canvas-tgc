import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 위치 이동시키기
const execute3_8_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    ctx.translate(100, 100);
    ctx.fillRect(50, 50, 100, 100);
}

// 크기 변형하기
const execute3_8_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    ctx.scale(0.5, 0.5);
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
}

// 회전시키기
const execute3_8_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillRect(100, 100, 100, 100);
    ctx.rotate(5 * Math.PI / 180);
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillRect(100, 100, 100, 100);
    ctx.rotate(5 * Math.PI / 180);
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillRect(100, 100, 100, 100);
}

// 사각형 형태 변형하기 > 확대
const execute3_8_4 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 4);

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
    ctx.transform(1.5, 0, 0, 1.5, 100, 100);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
}

// 사각형 형태 변형하기 > 기울이기
const execute3_8_5 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 5);

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
    ctx.transform(1.5, 0.2, 0.2, 1.5, 100, 100);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
}

// 사각형 형태 변형하기 > transform 1
const execute3_8_6 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 6);

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
    ctx.transform(1, 0.2, 0.2, 1, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 100, 100);
    ctx.setTransform(1, 0, 0, 1, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
}

// 사각형 형태 변형하기 > transform 2
const execute3_8_7 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 7);

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
    ctx.setTransform(1, 0.2, 0.2, 1, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 100, 100);
    ctx.transform(1, 0, 0, 1, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
}

const execute3_8 = () => {
    const id = 'chapter3_8'

    makeCanvasContainer(id, '3.8. 이동, 회전, 스케일, 변형하기', () => {
        execute3_8_1(id);
        execute3_8_2(id);
        execute3_8_3(id);
        execute3_8_4(id);
        execute3_8_5(id);
        execute3_8_6(id);
        execute3_8_7(id);
    });
}

export default execute3_8;