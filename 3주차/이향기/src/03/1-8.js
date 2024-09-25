const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 20;
ctx.strokeStyle = '#0000FF';

ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(300, 50);
ctx.lineTo(300, 100);
ctx.lineJoin = 'miter';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 150);
ctx.lineTo(300, 150);
ctx.lineTo(300, 200);
ctx.lineJoin = 'round';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 250);
ctx.lineTo(300, 250);
ctx.lineTo(300, 290);
ctx.lineJoin = 'bevel';
ctx.stroke();
