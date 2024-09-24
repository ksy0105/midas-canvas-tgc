import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-8-1')

// 위치 이동시키기
ctx.fillStyle = 'green'
ctx.fillRect(50, 50, 100, 100)
ctx.translate(100, 100)
ctx.fillRect(50, 50, 100, 100)