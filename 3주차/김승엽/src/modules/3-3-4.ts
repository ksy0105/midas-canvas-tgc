import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-3-4')

// bezierCurve 그리기
ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(300, 50)
ctx.bezierCurveTo(200, 70, 100, 150, 350, 100)
ctx.lineTo(350, 200)
ctx.stroke()