import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-19-2');

const ctxW = canvas.width;
const ctxH = canvas.height;
let x = 200;
let y = 150;

function animate() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctxW, ctxH);

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(x++, y+=0.5, 5, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
