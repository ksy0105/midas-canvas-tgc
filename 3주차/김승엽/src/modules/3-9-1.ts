import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-9-1')

// 색상 보정하기
ctx.fillStyle = 'red'
ctx.fillRect(20, 30, 100, 100)
ctx.fillStyle = 'green'
ctx.fillRect(50, 50, 100, 100)

const src = ctx.getImageData(0, 0, 100, 100)
ctx.putImageData(src, 200, 50)
ctx.strokeRect(0, 0, 100, 100)
ctx.strokeRect(200, 50, 100, 100)