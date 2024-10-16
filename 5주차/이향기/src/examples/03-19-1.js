import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-19-1');

ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.fillStyle = 'white';
ctx.arc(200, 150, 5, 0, Math.PI * 2);
ctx.fill();
