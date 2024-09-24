import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-2-1')

// 내부가 채워진 사각형 그리기
ctx.fillStyle = 'megenta'
ctx.fillRect(20, 20, 100, 100)
ctx.strokeRect(20, 20, 100, 100)
ctx.fillStyle = 'green'
ctx.fillRect(150, 150, 50, 50)
ctx.strokeRect(150, 150, 50, 50)