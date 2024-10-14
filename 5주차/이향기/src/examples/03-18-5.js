import getCanvas from "../get-canvas.js";

const { ctx } = getCanvas('03-18-4');

const ctxW = ctx.canvas.width;
const ctxH = ctx.canvas.height;

const bgImage = new Image();
bgImage.src = '/winternight.jpg';

const snowflakes = [];

/// 눈송이를 추가한다.
function addSnowflake() {
  // x 좌표를 랜덤으로 변경한다.
  let x = Math.floor(Math.random() * ctxW) + 1;
  let y = 0;
  // 눈송이의 크기를 랜덤으로 변경한다.
  const size = Math.floor(Math.random() * 3) + 1;

  snowflakes.push({ x, y, size });
}

// 눈송이를 그린다.
function snow() {
  addSnowflake();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  for (const [i] of snowflakes.entries()) {
    ctx.beginPath();
    const ty = snowflakes[i].y += snowflakes[i].size * 0.5;
    ctx.arc(snowflakes[i].x, ty, snowflakes[i].size * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // 화면을 넘어가면 삭제한다.
    if (snowflakes[i].y > ctxH) {
      snowflakes.splice(i, 1);
    }
  }
}

// 눈송이의 개수를 화면에 표시한다.
function displayCount() {
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText(snowflakes.length, 10, 20);
}

// 매 시간 화면을 갱신한다.
function animate() {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(bgImage, 0, 0);
  snow();
  displayCount();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
