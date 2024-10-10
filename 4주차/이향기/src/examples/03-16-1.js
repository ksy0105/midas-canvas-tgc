import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-16-1');

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

const bgImage = new Image();
bgImage.src = 'dog.jpg';

buildingImage.addEventListener('load', () => {
  ctx.drawImage(bgImage, 0, 0);
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

document.addEventListener('mousedown', (e) => {
  const mouseX = e.clientX - ctx.canvas.offsetLeft;
    const mouseY = e.clientY - ctx.canvas.offsetTop;

    for (const building of buildings) {
      if (mouseX >= building.x && mouseX < building.x + building.w &&
          mouseY >= building.y && mouseY < building.y + building.h) {
        console.log(building.id);

        ctx.clearRect(100, 260, 200, 30);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(100, 260, 200, 30);

        ctx.fillStyle = '#6459ED';
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px Arial, sans-serif';
        ctx.fillText(building.id, 200, 280);
      }
    }
});
