import getCanvas from "../get-canvas.js";

const { canvas } = getCanvas('03-12-1');

canvas.addEventListener('click', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  console.log(`X: ${mouseX}, Y: ${mouseY}`);
});
