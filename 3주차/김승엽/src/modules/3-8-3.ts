import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-8-3')

// 회전시키기
ctx.fillStyle = 'yellow'
ctx.strokeStyle = 'blue'
ctx.lineWidth = 3
ctx.strokeRect(100, 100, 100, 100)
ctx.fillRect(100, 100, 100, 100)
ctx.rotate(5 * Math.PI / 180)
ctx.strokeRect(100, 100, 100, 100)
ctx.fillRect(100, 100, 100, 100)
ctx.rotate(5 * Math.PI / 180)
ctx.strokeRect(100, 100, 100, 100)
ctx.fillRect(100, 100, 100, 100)
