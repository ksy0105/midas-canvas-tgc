import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-1-4')

// 선의 간격을 조정하여 점선 만들기
ctx.lineWidth = 10

ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineTo(300, 100)
ctx.setLineDash([20])
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 150)
ctx.lineTo(300, 150)
ctx.lineTo(300, 200)
ctx.setLineDash([20, 10])
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 250)
ctx.lineTo(300, 250)
ctx.lineTo(300, 300)
ctx.setLineDash([20, 10, 50, 10])
ctx.stroke()