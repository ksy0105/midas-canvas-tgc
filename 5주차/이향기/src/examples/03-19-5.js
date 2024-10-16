import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-19-5');

const ctxW = canvas.width;
const ctxH = canvas.height;

// 파티클
const particles = [];
const totalCount = 30;

// 중력
const gravity = 1;

function addParticle() {
  if (particles.length >= totalCount) return;

  const x = ctxW / 2;
  const y = ctxH / 4;
  const size = 3;

  // 초속도
  const vx = Math.random() * 20 - 10;
  const vy = Math.random() * 20 - 15;

  particles.push({x, y, size, vx, vy});
}

function particle() {
  addParticle();

  for (const [i] of particles.entries()) {
    ctx.beginPath();
    const grad = ctx.createLinearGradient(100, 0, 300, 0);
    grad.addColorStop(0,"white");
    grad.addColorStop(0.25,"yellow");
    grad.addColorStop(0.5,"red");
    grad.addColorStop(0.75,"yellow");
    grad.addColorStop(1,"white");
    ctx.fillStyle = grad;
    const x = particles[i].x += particles[i].vx;
    const y = particles[i].y += particles[i].vy;
    particles[i].vy += gravity;
    ctx.arc(x, y, particles[i].size, 0, Math.PI * 2);
    ctx.fill();

    // 화면을 넘어가면 삭제한다.
    if (particles[i].y > ctxH) {
      particles.splice(i, 1);
    }
  }
}

function animate() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctxW, ctxH);
  particle();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
