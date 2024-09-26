const $canvas = document.getElementById('canvas') as HTMLCanvasElement;

const CANVAS_WIDTH = 400; 
const CANVAS_HEIGHT = 300;
$canvas.width = CANVAS_WIDTH;
$canvas.height = CANVAS_HEIGHT;

const ctx = $canvas.getContext('2d')!;

const 선_그리기 = () => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.stroke();
}
// 선_그리기();

const 사각형_그리기 = () => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.stroke();
  ctx.fill();
}
// 사각형_그리기();

const 내부가_채워진_사각형_그리기 = ()=>{
  ctx.fillStyle = 'magenta';
  ctx.fillRect(20, 20, 100, 100);
  ctx.strokeRect(20, 20, 100, 100);
  ctx.clearRect(50,50,50,50);

  ctx.fillStyle = 'green';
  ctx.fillRect(150, 150, 50, 50);
  ctx.strokeRect(150, 150, 50, 50);
}
// 내부가_채워진_사각형_그리기();

const 기본_원_그리기 = () => {
  ctx.arc(150, 150, 100, 0, 2*Math.PI);
  ctx.stroke();
}
// 기본_원_그리기();

const 선과_호를_연결하여_라운드_코너_그리기 = () => {
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(300, 50);
  ctx.arcTo(350, 50, 350, 100, 50);
  ctx.stroke();
}
// 선과_호를_연결하여_라운드_코너_그리기();

const radio_gradient로_사각형_내부_채우기 = () => {
  const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
  grad.addColorStop(0, "red");
  grad.addColorStop(0.5, "purple");
  grad.addColorStop(1, "blue");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
// radio_gradient로_사각형_내부_채우기();

const 패턴으로_사각형_내부_채우기 = () => {
  const flowerImg = new Image();
  flowerImg.src = '../assets/images/flower_pattern.png';
  flowerImg.onload = () => {
    const pattern = ctx.createPattern(flowerImg, "repeat")!;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
// 패턴으로_사각형_내부_채우기();
