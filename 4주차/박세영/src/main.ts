const $canvas = document.getElementById("canvas") as HTMLCanvasElement;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 300;
$canvas.width = CANVAS_WIDTH;
$canvas.height = CANVAS_HEIGHT;

const ctx = $canvas.getContext("2d")!;

const 두_개의_이미지를_합성하여_그리기 = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(20, 20, 100, 100);
  ctx.globalCompositeOperation = "source-over";

  ctx.fillStyle = "blue";
  ctx.fillRect(50, 50, 100, 100);
};
// 두_개의_이미지를_합성하여_그리기();

const 애니메이션_만들기 = () => {
  let x = 0;
  let speed = 1;
  let direction = 1;
  let acceleration = 0.2;

  ctx.fillStyle = "red";
  setInterval(() => {
    x += direction * speed;
    speed += acceleration;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(x, 20, 100, 100);

    if (x > CANVAS_WIDTH - 100 || x < 0) {
      if (x > CANVAS_WIDTH - 100) x = CANVAS_WIDTH - 100;
      if (x < 0) x = 0;

      direction *= -1;
      speed = 1;
    }
  }, 30);
};
// 애니메이션_만들기()

const 마우스로_클릭한_곳의_좌표_얻기 = () => {
  $canvas.addEventListener("click", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    ctx.fillRect(x - 25, y - 25, 50, 50);
  });
};
// 마우스로_클릭한_곳의_좌표_얻기();

const 백그라운드_이미지_애니메이션_만들기 = () => {
  const bgImage = new Image();
  bgImage.src = "images/space.png";
  let x = 0;
  const animate = () => {
    x -= 1;
    if (x <= -CANVAS_WIDTH) x = 0;
    ctx.drawImage(bgImage, x, 0);
  }
  setInterval(animate, 30);
};
백그라운드_이미지_애니메이션_만들기()