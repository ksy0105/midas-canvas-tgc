import {getCtx} from "../../common.ts";

// 3.2 > 사각형 그리기
export const execute3_2_1 = () => {
    const ctx = getCtx('#chapter3_2_1');

    ctx.strokeRect(20, 20, 100, 100);
    ctx.fillStyle = "magenta";
    ctx.fillRect(150, 150, 50, 50);
    ctx.strokeRect(150, 150, 50, 50);
}

// 3.2 > 내부를 사각형으로 지우기
export const execute3_2_2 = () => {
    const ctx = getCtx('#chapter3_2_2');

    ctx.lineWidth = 20;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 200, 200);
    ctx.strokeRect(50, 50, 200, 200);
    ctx.clearRect(70, 70, 100, 50);
}