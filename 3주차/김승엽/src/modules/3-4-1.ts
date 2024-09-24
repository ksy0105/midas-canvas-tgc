import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-4-1')

// Gradient로 내부 채우기
const grad = ctx.createLinearGradient(50, 50, 250, 50)
grad.addColorStop(0/6, 'red')
grad.addColorStop(1/6, "orange")
grad.addColorStop(2/6, "yellow")
grad.addColorStop(3/6, "green")
grad.addColorStop(4/6, "aqua")
grad.addColorStop(5/6, "blue")
grad.addColorStop(6/6, "purple")

ctx.lineWidth = 5
ctx.fillStyle = grad
ctx.fillRect(50, 50, 200, 200)
ctx.strokeRect(50, 50, 200, 200)