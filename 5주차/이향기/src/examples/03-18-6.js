import getCanvas from "../get-canvas.js";

const { canvas,ctx } = getCanvas('03-18-4');

const ctxW = canvas.width + 100;
const ctxH = canvas.height + 100;

const bgImage = new Image();
bgImage.src = '/winternight.jpg';

const snowflakes = [];

/// 눈송이를 추가한다.
function addSnowflake() {
  // x 좌표를 랜덤으로 변경한다.
  let x = Math.floor(Math.random() * ctxW) - 100;
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
  ctx.save();
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(bgImage, 0, 0);
  displayCount();
  ctx.rotate(-0.2);
  snow();
  ctx.restore();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
