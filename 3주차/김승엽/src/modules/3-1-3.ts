import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-1-3')

// 선의 꺾인 부분 처리하기
ctx.lineWidth = 20
ctx.strokeStyle = '#0000ff'

ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineTo(300, 100)
ctx.lineJoin = 'miter'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 150)
ctx.lineTo(300, 150)
ctx.lineTo(300, 200)
ctx.lineJoin = 'round'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 250)
ctx.lineTo(300, 250)
ctx.lineTo(300, 300)
ctx.lineJoin = 'bevel'
ctx.stroke()