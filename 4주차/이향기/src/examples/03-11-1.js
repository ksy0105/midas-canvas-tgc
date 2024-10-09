import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-11-1');

const ctxW = canvas.width;
const ctxH = canvas.height;

let x = 0;
function animate() {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.fillStyle = "red";
  ctx.fillRect(x, 10, 50, 50);
  x++;
}

const animateInterval = setInterval(animate, 30);
