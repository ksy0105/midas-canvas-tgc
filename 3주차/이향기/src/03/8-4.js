const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "yellow";
ctx.strokeStyle = 'blue';
ctx.lineWidth = 3;
ctx.strokeRect(0, 0, 100, 100);
ctx.fillRect(0, 0, 100, 100);
ctx.transform(1.5, 0, 0, 1.5, 100, 100);
ctx.strokeRect(0, 0, 100, 100);
ctx.fillRect(0, 0, 100, 100);
