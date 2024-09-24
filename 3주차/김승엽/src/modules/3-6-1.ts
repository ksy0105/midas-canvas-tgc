import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-6-1')

// 글씨 그리기
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 100)
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 120, 100)
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 140, 100)
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 160, 100)
