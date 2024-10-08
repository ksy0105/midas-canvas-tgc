import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// JSON 객체를 배열로 처리하여 사각형을 캔버스에 그리기
const execute3_15_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const buildings = [
        {id: "house", x: 50, y: 100, w: 50, h: 50, bg: "magenta"},
        {id: "hospital", x: 150, y: 100, w: 50, h: 50, bg: "green"},
        {id: "firestation", x: 250, y: 100, w: 50, h: 50, bg: "orange"},
    ]

    for (let i = 0; i < buildings.length; i++) {
        const b = buildings[i];
        ctx.fillStyle = b.bg;
        ctx.fillRect(b.x, b.y, b.w, b.h);
    }
}

// JSON 객체를 배열로 처리하여 캔버스에 이미지 그리기
const execute3_15_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    const buildings = [
        {id: "AirPort", x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0},
        {id: "Bank", x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0},
        {id: "CarRepair", x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0},
        {id: "GasStation", x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0},
        {id: "Hospital", x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0},
        {id: "Temple", x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0},
    ]

    const buildingImage = new Image();
    buildingImage.src = "buildings.png";

    buildingImage.onload = function() {
        for (let i = 0; i < buildings.length; i++) {
            const sx = buildings[i]['sx'];
            const sy = buildings[i]['sy'];
            const sw = buildings[i]['w'];
            const sh = buildings[i]['h'];
            const dx = buildings[i]['x'];
            const dy = buildings[i]['y'];
            const dw = buildings[i]['w'];
            const dh = buildings[i]['h'];

            ctx.drawImage(buildingImage, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
}

const execute3_15 = () => {
    const id = 'chapter3_15'

    makeCanvasContainer(id, '3.15. JSON 객체와 배열 처리하기', () => {
        execute3_15_1(id);
        execute3_15_2(id);
    });
}

export default execute3_15;