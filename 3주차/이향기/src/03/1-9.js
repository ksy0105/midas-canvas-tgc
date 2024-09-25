const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 10;

ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(300, 50);
ctx.lineTo(300, 100);
ctx.setLineDash([20]);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 150);
ctx.lineTo(300, 150);
ctx.lineTo(300, 200);
ctx.setLineDash([20, 10]);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 250);
ctx.lineTo(300, 250);
ctx.lineTo(300, 290);
ctx.setLineDash([20, 10, 50, 10]);
ctx.stroke();
