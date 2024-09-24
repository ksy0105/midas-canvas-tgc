import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-6-3')

// 글씨의 외곽선 그리기
ctx.fillStyle = '#6495ED'
ctx.font = 'italic bold 40px Arial, sans-serif'
ctx.fillText('Hello World!', 10, 100)
ctx.lineWidth = 2
ctx.strokeText('Hello World!', 10, 100)
