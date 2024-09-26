export const drawLine = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(350, 250);
    ctx.stroke();
}
