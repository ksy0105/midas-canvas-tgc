export const circle = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}
