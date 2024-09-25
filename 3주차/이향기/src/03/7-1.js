const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 3;
ctx.fillStyle="red";
ctx.fillRect(50, 50, 100, 100);
