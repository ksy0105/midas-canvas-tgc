export const curve = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.lineTo(150, 40);
    ctx.arcTo(200, 40, 200, 90, 50);
    ctx.lineTo(200, 140);
    ctx.stroke();
}

export const quadraticCurve = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.lineTo(150, 40);
    ctx.quadraticCurveTo(200, 40, 200, 90);
    ctx.lineTo(200, 140);
    ctx.stroke();
}

export const bezierCurve = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.lineTo(150, 40);
    ctx.bezierCurveTo(200, 40, 200, 90, 200, 140);
    ctx.lineTo(200, 140);
    ctx.stroke();
}
