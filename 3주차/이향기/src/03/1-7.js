const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 20;
ctx.strokeStyle = '#0000FF';

ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(300, 50);
ctx.lineCap = 'butt';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(300, 100);
ctx.lineCap = 'round';
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 150);
ctx.lineTo(300, 150);
ctx.lineCap = 'square';
ctx.stroke();
