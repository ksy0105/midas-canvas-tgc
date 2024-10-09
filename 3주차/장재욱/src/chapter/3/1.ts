import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 선그리기
const execute3_1_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
}

// 사각형 그리기
const execute3_1_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.stroke();
}

// 내부에 색 채우기
const execute3_1_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.stroke();
    ctx.fill();
}

// 붉은 색으로 내부 채우기
const execute3_1_4 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 4);

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
}

// 선의 색을 다른 색으로 채우고 두께 변경하기
const execute3_1_5 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 5);

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#0000ff";
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
}

// 끝부분 처리하기
const execute3_1_6 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 6);

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#0000ff";
    ctx.lineCap = "square";
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
}

// 선의 세 가지 끝부분 처리 방법 알아보기
const execute3_1_7 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 7);

    ctx.lineWidth = 20;
    ctx.strokeStyle = "#0000ff";

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineCap = "butt";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(300, 250);
    ctx.lineCap = "square";
    ctx.stroke();
}

// 선의 꺾인 부분 처리하기
const execute3_1_8 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 8);

    ctx.lineWidth = 20;
    ctx.strokeStyle = "#0000ff";

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 100);
    ctx.lineJoin = "miter";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.lineTo(300, 200);
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(300, 250);
    ctx.lineTo(300, 300);
    ctx.lineJoin = "bevel";
    ctx.stroke();
}

// 선의 간격을 조정하여 점선 만들기
const execute3_1_9 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 9);

    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 100);
    ctx.setLineDash([20]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.lineTo(300, 200);
    ctx.setLineDash([20, 10]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(300, 250);
    ctx.lineTo(300, 300);
    ctx.setLineDash([20, 10, 50, 10]);
    ctx.stroke();
}

const execute3_1 = () => {
    const id = 'chapter3_1'

    makeCanvasContainer(id, '3.1. 선그리기', () => {
        execute3_1_1(id);
        execute3_1_2(id);
        execute3_1_3(id);
        execute3_1_4(id);
        execute3_1_5(id);
        execute3_1_6(id);
        execute3_1_7(id);
        execute3_1_8(id);
        execute3_1_9(id);
    }, true);
}

export default execute3_1;