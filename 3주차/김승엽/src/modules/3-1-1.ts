import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-1-1')

// 사각형 그리기
ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineTo(300, 200)
ctx.lineTo(100, 200)
ctx.lineTo(100, 50)
ctx.lineWidth = 20
ctx.strokeStyle = '#0000ff'
ctx.lineCap = 'square'
ctx.stroke()
ctx.fillStyle = 'red'
ctx.fill()