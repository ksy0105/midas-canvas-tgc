import {getCtx} from "../../common.ts";

// 3.8 > 이동하기
export const execute3_8_1 = () => {
    const ctx = getCtx('#chapter3_8_1');

    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    ctx.translate(100, 100);
    ctx.fillRect(50, 50, 100, 100);
}

// 3.8 > 크기 변형하기
export const execute3_8_2 = () => {
    const ctx = getCtx('#chapter3_8_2');

    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    ctx.scale(0.5, 0.5);
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
}

// 3.8 > 사각형 형태 변형하기
export const execute3_8_3 = () => {
    const ctx = getCtx('#chapter3_8_3');

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillRect(100, 100, 100, 100);
    ctx.rotate(5 * Math.PI / 180);
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillRect(100, 100, 100, 100);
}

// 3.8 > 사각형 형태 변형하기
export const execute3_8_4 = () => {
    const ctx = getCtx('#chapter3_8_4');

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
    ctx.transform(1.5, 0.1, 0.1, 1.5, 100, 100);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
}
