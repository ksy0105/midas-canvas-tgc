import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-8-5')

// 100 이동한 사각형 기울이기
ctx.fillStyle = 'yellow'
ctx.strokeStyle = 'blue'
ctx.lineWidth = 3
ctx.strokeRect(0, 0, 100, 100)
ctx.fillRect(0, 0, 100, 100)
ctx.transform(1, 0.2, 0.2, 1, 100, 100)
ctx.strokeRect(0, 0, 100, 100)
ctx.fillRect(0, 0, 100, 100)