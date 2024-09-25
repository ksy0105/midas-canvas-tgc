const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle ='magenta';
ctx.fillRect(20, 20, 100, 100);
ctx.strokeRect(20, 20, 100, 100);

ctx.fillStyle ='green';
ctx.fillRect(150, 150, 50, 50);
ctx.strokeRect(150, 150, 50, 50);
