import getCanvas from "../get-canvas.js";

const { ctx } = getCanvas('03-18-2');

const ctxW = ctx.canvas.width;
const ctxH = ctx.canvas.height;

const bgImage = new Image();
bgImage.src = '/winternight.jpg';

let y = 0;

// 눈송이를 그린다.
function snow() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.arc(100, y++, 5, 0, Math.PI * 2);
  ctx.fill();
}

// 매 시간 화면을 갱신한다.
function animate() {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(bgImage, 0, 0);
  snow();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
