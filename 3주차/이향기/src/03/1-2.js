const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(300, 50);
ctx.lineTo(300, 200);
ctx.lineTo(100, 200);
ctx.lineTo(100, 50);
ctx.stroke();
