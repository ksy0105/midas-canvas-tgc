const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "yellow";
ctx.strokeStyle = 'blue';
ctx.lineWidth = 3;
ctx.strokeRect(100, 100, 100, 100);
ctx.fillRect(100, 100, 100, 100);
ctx.rotate(5 * Math.PI / 180);
ctx.strokeRect(100, 100, 100, 100);
ctx.fillRect(100, 100, 100, 100);
ctx.rotate(5 * Math.PI / 180);
ctx.strokeRect(100, 100, 100, 100);
ctx.fillRect(100, 100, 100, 100);
