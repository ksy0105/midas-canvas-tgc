export const rectangle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeRect(10, 10, 100, 100);
}

export const filledRectangle = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 100);
}

export const rectangleInsideRectangle = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
    ctx.strokeRect(10, 10, 100, 100);
    ctx.clearRect(30, 30, 60, 60);
}
