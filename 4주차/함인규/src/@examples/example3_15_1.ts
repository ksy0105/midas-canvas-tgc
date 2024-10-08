import {CanvasExample} from "../@model/CanvasExample.ts";

const BUILDINGS = [
    { id: 'house', x: 50, y: 100, w: 50, h: 50, bg: 'magenta' },
    { id: 'hospital', x: 150, y: 100, w: 50, h: 50, bg: 'green' },
    { id: 'fire-station', x: 250, y: 100, w: 50, h: 50, bg: 'orange' },
]

// Json 객체를 배열로 처리하여 사각형을 캔버스에 그리기
export default new CanvasExample((_, ctx) => {
    BUILDINGS.forEach(({ x, y, w, h, bg }) => {
        ctx.fillStyle = bg;
        ctx.fillRect(x, y, w, h);
    });
});