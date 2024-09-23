import {getCtx} from "../../common.ts";

// 3.3 > 원 그리기
export const execute3_3_1 = () => {
    const ctx = getCtx('#chapter3_3_1');

    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.stroke();
}

// 3.3 > 라운드 코너 그리기
export const execute3_3_2 = () => {
    const ctx = getCtx('#chapter3_3_2');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.arcTo(350, 50, 350, 100, 50);
    ctx.lineTo(350, 200);
    ctx.stroke();
}

// 3.3 > quadraticCurve 그리기
export const execute3_3_3 = () => {
    const ctx = getCtx('#chapter3_3_3');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.quadraticCurveTo(200, 100, 350, 100)
    ctx.lineTo(350, 200);
    ctx.stroke();
}

// 3.3 > bezierCurve 그리기
export const execute3_3_4 = () => {
    const ctx = getCtx('#chapter3_3_4');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.bezierCurveTo(200, 70, 100, 150, 350, 100);
    ctx.lineTo(350, 200);
    ctx.stroke();
}
