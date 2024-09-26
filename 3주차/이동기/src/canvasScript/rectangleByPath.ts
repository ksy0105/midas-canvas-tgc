export const drawRectangleByPath = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(100, 20);
    ctx.lineTo(100, 100);
    ctx.lineTo(20, 100);
    ctx.lineJoin = 'round';
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fill();
}
