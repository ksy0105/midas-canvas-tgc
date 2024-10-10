import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-15-1');

const buildings = [
  {id: 'house', x: 50, y: 100, w: 50, h: 50, bg: 'magenta'},
  {id: 'hospital', x: 150, y: 100, w: 50, h: 50, bg: 'green'},
  {id: 'firestation', x: 250, y: 100, w: 50, h: 50, bg: 'orange'},
];

for (const building of buildings) {
  ctx.fillStyle = building.bg;
  ctx.fillRect(building.x, building.y, building.w, building.h);
}
