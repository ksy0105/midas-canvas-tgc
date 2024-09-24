import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-8-4')

// 사각형 형태 변형하기
ctx.fillStyle = 'yellow'
ctx.strokeStyle = 'blue'
ctx.lineWidth = 3
ctx.strokeRect(0, 0, 100, 100)
ctx.fillRect(0, 0, 100, 100)
ctx.transform(1.5, 0, 0, 1.5, 100, 100)
ctx.strokeRect(0, 0, 100, 100)
ctx.fillRect(0, 0, 100, 100)