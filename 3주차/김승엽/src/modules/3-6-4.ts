import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-6-4')

// 글씨의 좌우정렬 알아보기
ctx.fillStyle = '#6495ED'
ctx.font = 'italic bold 30px Arial, sans-serif'
ctx.textAlign = 'start'
ctx.fillText('Hello World!', 200, 50)
ctx.textAlign = 'end'
ctx.fillText('Hello World!', 200, 100)
ctx.textAlign = 'left'
ctx.fillText('Hello World!', 200, 150)
ctx.textAlign = 'right'
ctx.fillText('Hello World!', 200, 200)
ctx.textAlign = 'center'
ctx.fillText('Hello World!', 200, 250)
ctx.strokeStyle='red'
ctx.moveTo(200, 20)
ctx.lineTo(200, 370)
ctx.stroke()
