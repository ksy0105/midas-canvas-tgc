import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-3-2')

// 선과 호를 연결하여 라운드 코너 그리기
ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(300, 50)
ctx.arcTo(350, 50, 350, 100, 50)
ctx.lineTo(350, 200)
ctx.stroke()