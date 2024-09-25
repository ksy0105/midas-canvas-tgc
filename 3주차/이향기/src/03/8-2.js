const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "green";
ctx.fillRect(50, 50, 100, 100);
ctx.scale(0.5, 0.5);
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
