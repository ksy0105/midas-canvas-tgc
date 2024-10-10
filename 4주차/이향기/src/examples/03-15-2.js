import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-15-2');

const buildings = [
  {id: 'AirPort', x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0},
  {id: 'Bank', x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0},
  {id: 'CarRepair', x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0},
  {id: 'GasStation', x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0},
  {id: 'Hospital', x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0},
  {id: 'Temple', x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0},
];

const buildingImage = new Image();
buildingImage.src = 'buildings.png';

buildingImage.addEventListener('load', () => {
  for (const building of buildings) {
    const sx = building.sx;
    const sy = building.sy;
    const sw = building.w;
    const sh = building.h;
    const dx = building.x;
    const dy = building.y;
    const dw = building.w;
    const dh = building.h;
    ctx.drawImage(buildingImage, sx, sy, sw, sh, dx, dy, dw, dh);
  }
});
