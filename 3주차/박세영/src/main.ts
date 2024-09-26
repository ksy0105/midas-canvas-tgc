const $canvas = document.getElementById('canvas') as HTMLCanvasElement;

const CANVAS_WIDTH = 400; 
const CANVAS_HEIGHT = 300;
$canvas.width = CANVAS_WIDTH;
$canvas.height = CANVAS_HEIGHT;

const getAssetPath = (fileName: string) => `../assets/images/${fileName}`

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
  flowerImg.src = getAssetPath('flower_pattern.png');
  flowerImg.onload = () => {
    const pattern = ctx.createPattern(flowerImg, "repeat")!;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
// 패턴으로_사각형_내부_채우기();

const 이미지를_잘라_일부만_그리기 = () => {
  const catImg = new Image();
  catImg.src = getAssetPath('street_cat.jpg');
  catImg.onload = () => {
    ctx.drawImage(catImg, 100, 100, 200, 200, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
// 이미지를_잘라_일부만_그리기();

const 글씨의_외곽선_그리기 = () => {
  ctx.fillStyle = 'black';

  ctx.font = "italic bold 40px Arial, sans-serif"; //글씨 폰트 스타일 변경
  ctx.fillText('Hello World', 10, 100);

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'yellow'
  ctx.strokeText('Hello World', 10, 100);
}
// 글씨의_외곽선_그리기();

const 그림자_그리기 = () => {
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 3;
  ctx.fillStyle = "red";
  ctx.fillRect(50, 50, 100, 100);
};
// 그림자_그리기();

const 위치_이동하기 = () => {
  ctx.fillStyle = 'green';
  ctx.fillRect(50, 50, 100, 100);
  ctx.translate(40, 40);
  ctx.fillRect(50, 50, 100, 100);
};
// 위치_이동하기();

const 크기_변형하기 = () => {
  ctx.fillStyle = 'green';
  ctx.fillRect(50, 50, 100, 100);
  ctx.scale(0.5, 0.5);
  ctx.fillRect(50, 50, 100, 100);
};
// 크기_변형하기();

const 회전시키기 = () => {
  ctx.fillStyle = 'green';
  ctx.strokeRect(100, 100, 100, 100);
  ctx.rotate(0.1);
  ctx.strokeRect(100, 100, 100, 100);
  ctx.rotate(0.1);
  ctx.strokeRect(100, 100, 100, 100);
};
// 회전시키기();

const 사각형_형태_변형하기 = () => {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(20, 20, 100, 100);
  // ctx.transform(1, 0.2, 0, 1, 120, 120);
  ctx.transform(1, 0, 0.2, 1, 120, 120);
  ctx.fillRect(20, 20, 100, 100);
};
// 사각형_형태_변형하기();

const 이미지_색상_반전시키기 = () => {
  const catImg = new Image();
  catImg.src = getAssetPath('street_cat.jpg');
  catImg.onload = () => {
    ctx.drawImage(catImg, 50, 40, 400, 300, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const imgData = ctx.getImageData(200, 100, 100, 100);
    const imgRaw = imgData.data;

    for(let i=0; i < imgRaw.length; i+=4) {
      imgRaw[i] = 255 - imgRaw[i];
      imgRaw[i+1] = 255 - imgRaw[i+1];
      imgRaw[i+2] = 255 - imgRaw[i+2];
    }
    
    ctx.putImageData(imgData, 200, 100)
  }
}
이미지_색상_반전시키기()
