import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()

// 알파값 적용하기
ctx.fillStyle = 'rgba(63,169,245,1)'
ctx.fillRect(20, 20, 100, 100)
ctx.globalAlpha = 0.5
ctx.fillStyle = 'blue'
ctx.fillRect(50, 50, 100, 100)