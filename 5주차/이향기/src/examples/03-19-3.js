import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-19-3');

const ctxW = canvas.width;
const ctxH = canvas.height;
let x = ctxW / 2;
let y = ctxH / 2;
// 초속도
let vx = 10;
let vy = -10;
// 중력
const gravity = 1;

function animate() {
  x += vx;
  y += vy;
  vy += gravity;

  console.log("x:"+x+" y:"+y);
  console.log("vx:"+vx+" vy:"+vy);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctxW, ctxH);

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(x++, y+=0.5, 5, 0, Math.PI * 2);
  ctx.fill();
}

setInterval(animate, 1000);
