import {CanvasExample} from "../@model/CanvasExample.ts";

const BUILDINGS = [
    { id: "AirPort",   x:  50, y:  50, w: 64, h: 64, sx:   0, sy:   0 },
    { id: "Bank",      x: 150, y:  50, w: 64, h: 64, sx: 100, sy:   0 },
    { id: "CarRepair", x: 250, y:  50, w: 64, h: 64, sx: 200, sy:   0 },
    { id: "GasStation",x:  50, y: 150, w: 64, h: 64, sx: 300, sy:   0 },
    { id: "Hospital",  x: 150, y: 150, w: 64, h: 64, sx: 400, sy:   0 },
    { id: "Temple",    x: 250, y: 150, w: 64, h: 64, sx: 500, sy:   0 }
];

// Json 객체를 배열로 처리하여 캔버스에 이미지 그리기
export default new CanvasExample((_, ctx) => {
    const buildingImg = new Image();
    buildingImg.src = '/buildings.png';

    buildingImg.onload = () => {
        BUILDINGS.forEach(building => {
            ctx.drawImage(buildingImg, building.sx, building.sy, building.w, building.h, building.x, building.y, building.w, building.h);
        });
    }
});
