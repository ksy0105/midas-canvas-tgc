import {getCtx} from "../../common.ts";

// 3.7 > 그림자 그리기
export const execute3_7_1 = () => {
    const ctx = getCtx('#chapter3_7_1');

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 3;
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
}
