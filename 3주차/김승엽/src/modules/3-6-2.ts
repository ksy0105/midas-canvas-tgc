import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-6-2')

// 글씨 크기를 크게 변경하기
ctx.fillStyle = '#6495ED'
ctx.font = 'italic bold 28px Arial, sans-serif'
ctx.fillText('Hello World!', 50, 100)
