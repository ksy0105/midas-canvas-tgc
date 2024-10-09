import getCanvas from "../get-canvas.js";

const { ctx } = getCanvas('03-10-2');

ctx.fillStyle = 'rgba(63, 169, 245, 1)';
ctx.fillRect(20, 20, 100, 100);
ctx.globalCompositeOperation = 'source-over';
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);
