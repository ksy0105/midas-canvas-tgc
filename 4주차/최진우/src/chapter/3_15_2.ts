import {initCanvas} from '../common.ts';

const draw3_15_2 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);

    const buildings = [
        {id: 'Airport', x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0},
        {id: 'Bank', x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0},
        {id: 'CarRepair', x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0},
        {id: 'GasStation', x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0},
        {id: 'Hospital', x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0},
        {id: 'Temple', x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0},
    ];

    const buildingImg = new Image();
    buildingImg.src = 'src/images/buildings.png';
    buildingImg.onload = () => {
        for(let i = 0; i < buildings.length; i++) {
            const sx = buildings[i]['sx'];
            const sy = buildings[i]['sy'];
            const sw = buildings[i]['w'];
            const sh = buildings[i]['h'];
            const dx = buildings[i]['x'];
            const dy = buildings[i]['y'];
            const dw = buildings[i]['w'];
            const dh = buildings[i]['h'];

            ctx.drawImage(buildingImg, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
};

export default draw3_15_2;
