import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-7-1')

// 사각형의 그림자 그려보기
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
ctx.shadowOffsetX = 5
ctx.shadowOffsetY = 5
ctx.shadowBlur = 3
ctx.fillStyle = 'red'
ctx.fillRect(50, 50, 100, 100)