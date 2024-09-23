import './style.css'

function createCanvas(width: number, height: number) {
    const $app = document.getElementById('app')!;
    const $canvas = document.createElement('canvas');
    $canvas.width = width;
    $canvas.height = height;
    $app.appendChild($canvas);
    return $canvas;
}

//선그리기
const $canvas1 = createCanvas(400, 300);
const ctx1 = $canvas1.getContext('2d')!;
ctx1.beginPath();
ctx1.moveTo(100, 50);
ctx1.lineTo(300,50);
ctx1.stroke();

//사각형 그리기
const $canvas2 = createCanvas(400, 300);
const ctx2 = $canvas2.getContext('2d')!;
ctx2.beginPath();
ctx2.moveTo(100, 50);
ctx2.lineTo(300, 50);
ctx2.lineTo(300, 200);
ctx2.lineTo(100, 200);
ctx2.lineTo(100, 50);
ctx2.stroke();
