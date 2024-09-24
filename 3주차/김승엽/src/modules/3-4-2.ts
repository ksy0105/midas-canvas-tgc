import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-4-2')

// radial gradient로 사각형 내부 채우기
const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300)
grad.addColorStop(0/2, 'red')
grad.addColorStop(1/2, 'yellow')
grad.addColorStop(2/2, 'black')

ctx.lineWidth = 5
ctx.fillStyle = grad
ctx.fillRect(0, 0, 300, 300)
ctx.strokeRect(0, 0, 300, 300)