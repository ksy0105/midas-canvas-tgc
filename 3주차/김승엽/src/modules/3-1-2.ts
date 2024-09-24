import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-1-2')

// 선의 세 가지 끝부분 처리 방법 알아보기
ctx.lineWidth = 20
ctx.strokeStyle = '#0000ff'

ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineCap = 'butt'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(300, 100)
ctx.lineCap = 'round'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 150)
ctx.lineTo(300, 150)
ctx.lineCap = 'square'
ctx.stroke()