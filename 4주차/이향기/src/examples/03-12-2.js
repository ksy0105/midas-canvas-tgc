import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-12-2');

canvas.addEventListener('click', (e) => {
  const mouseX = e.clientX - ctx.canvas.offsetLeft;
  const mouseY = e.clientY - ctx.canvas.offsetTop;
  ctx.fillStyle = 'red';
  ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20);
});
