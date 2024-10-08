import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()

// 두 개의 이미지를 합성하여 그리기
ctx.fillStyle = 'red'
ctx.fillRect(20, 20, 100, 100)
ctx.globalCompositeOperation = 'xor'
ctx.fillStyle = 'blue'
ctx.fillRect(50, 50, 100, 100)