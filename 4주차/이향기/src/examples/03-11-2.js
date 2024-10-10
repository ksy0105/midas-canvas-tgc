import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-11-2');

const ctxW = canvas.width;
const ctxH = canvas.height;

let x = 0, y = 0;
function animate() {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.fillStyle = 'red';
  ctx.fillRect(x, 10, 50, 50);
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, y, 50, 50);
  x++;
  y++;

  if (x > ctxW) x = 0;
  if (y > ctxH) y = 0;
}

const animateInterval = setInterval(animate, 30);
canvas.addEventListener('click', () => {
  clearInterval(animateInterval);
});
