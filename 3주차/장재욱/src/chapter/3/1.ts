import {getCtx} from "../../common.ts";

// 3.1 > 선 그리기
export const execute3_1_1 = () => {
    const ctx = getCtx('#chapter3_1_1');

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.stroke();
}

// 3.1 > 사각형 그리기
export const execute3_1_2 = () => {
    const ctx = getCtx('#chapter3_1_2');

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.lineCap = "square";
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
}

// 3.1 > 선의 꺾인 부분 처리하기
export const execute3_1_3 = () => {
    const ctx = getCtx('#chapter3_1_3');

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