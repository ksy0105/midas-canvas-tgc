import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-8-2')

// 크기 변형하기
ctx.fillStyle = 'green'
ctx.fillRect(50, 50, 100, 100)
ctx.scale(0.5, 0.5)
ctx.fillStyle = 'red'
ctx.fillRect(50, 50, 100, 100)