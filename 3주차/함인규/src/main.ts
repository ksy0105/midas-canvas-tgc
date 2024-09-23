import './style.css'

//선그리기
const $canvas1 = document.querySelector<HTMLCanvasElement>('#canvas1')!;
const ctx1 = $canvas1.getContext('2d')!;
ctx1.beginPath();
ctx1.moveTo(100, 50);
ctx1.lineTo(300,50);
ctx1.stroke();

