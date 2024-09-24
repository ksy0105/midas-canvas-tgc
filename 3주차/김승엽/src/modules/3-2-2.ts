import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-2-2')

// 내부를 사각형으로 지우기
ctx.lineWidth = 10;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'blue'
ctx.fillRect(50, 50, 200, 200)
ctx.strokeRect(50, 50, 200, 200)
ctx.clearRect(70, 70, 100, 50)