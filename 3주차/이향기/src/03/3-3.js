const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(300, 50);
ctx.quadraticCurveTo(200, 100, 350, 100);
ctx.lineTo(350, 200);
ctx.stroke();
