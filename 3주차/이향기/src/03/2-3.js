const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.lineWidth = 10;
ctx.strokeStyle = 'red';
ctx.fillStyle ='blue';
ctx.fillRect(50, 50, 200, 200);
ctx.strokeRect(50, 50, 200, 200);
ctx.clearRect(70, 70, 100, 50);
