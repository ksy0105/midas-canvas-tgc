import getCanvas from "../get-canvas.js";

const { ctx } = getCanvas('03-18-1');

const ctxW = ctx.canvas.width;
const ctxH = ctx.canvas.height;

const bgImage = new Image();
bgImage.src = '/winternight.jpg';

function animate() {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(bgImage, 0, 0);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
