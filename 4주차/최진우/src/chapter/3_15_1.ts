import {initCanvas} from '../common.ts';

const draw3_15_1 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);

    const buildings = [
        {id: 'house', x: 50, y: 100, w: 50, h: 50, bg: 'magenta'},
        {id: 'hospital', x: 150, y: 100, w: 50, h: 50, bg: 'green'},
        {id: 'firestation', x: 250, y: 100, w: 50, h: 50, bg: 'orange'},
    ];

    for(let i = 0; i < buildings.length; i++) {
        const building = buildings[i];
        ctx.fillStyle = building.bg;
        ctx.fillRect(building.x, building.y, building.w, building.h);
    }
};

export default draw3_15_1;
