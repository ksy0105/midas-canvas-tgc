import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()

// JSON 객체를 배열로 처리하여 사각형을 캔버스에 그리기
const buildings = [
    {id: 'house', x: 50, y: 100, w: 50, h: 50, bg: 'magenta'},
    {id: 'hospital', x: 150, y: 100, w: 50, h: 50, bg: 'green'},
    {id: "firestation", x: 250, y: 100, w: 50, h: 50, bg: 'orange'}
]

for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i]
    ctx.fillStyle = b.bg
    ctx.fillRect(b.x, b.y, b.w, b.h)
}