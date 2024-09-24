import {getCtx} from "../../common.ts";

// 3.6 > 글씨 쓰기
export const execute3_6_1 = () => {
    const ctx = getCtx('#chapter3_6_1');

    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 100);
    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 120, 100);
    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 140, 200);
    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 160, 300);
}
