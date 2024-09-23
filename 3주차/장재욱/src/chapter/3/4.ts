import {getCtx} from "../../common.ts";

// 3.4 > LinearGradient
export const execute3_4_1 = () => {
    const ctx = getCtx('#chapter3_4_1');

    const grad = ctx.createLinearGradient(50, 50, 250, 50);
    grad.addColorStop(0, "red");
    grad.addColorStop(1 / 6, "orange");
    grad.addColorStop(2 / 6, "yellow");
    grad.addColorStop(3 / 6, "green");
    grad.addColorStop(4 / 6, "aqua");
    grad.addColorStop(5 / 6, "blue");
    grad.addColorStop(1, "purple");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad;
    ctx.fillRect(50, 50, 200, 200);
    ctx.strokeRect(50, 50, 200, 200);
}

// 3.4 > RadialGradient
export const execute3_4_2 = () => {
    const ctx = getCtx('#chapter3_4_2');

    const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
    grad.addColorStop(0, "red");
    grad.addColorStop(0.5, "yellow");
    grad.addColorStop(1, "black");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 300, 300);
    ctx.strokeRect(0, 0, 300, 300);
}