const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
grad.addColorStop(0,"red");
grad.addColorStop(0.5,"yellow");
grad.addColorStop(1,"black");
ctx.lineWidth = 5;
ctx.fillStyle = grad;
ctx.fillRect(0,0,300,300);
ctx.strokeRect(0,0,300,300);
