import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-3-1')

// 기본 원그리기
ctx.arc(150, 150, 100, 0, Math.PI * 2)
ctx.stroke()