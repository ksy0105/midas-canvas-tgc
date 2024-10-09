import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-13-1');

const bgImage = new Image();
bgImage.src = 'dog.jpg';
let x = 0;
function animate() {
  ctx.drawImage(bgImage, x--, -250);
  if (x <= -400) x = 0;
}
const animateInterval = setInterval(animate, 15);
