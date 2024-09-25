const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "green";
ctx.fillRect(50, 50, 100, 100);
ctx.translate(100,100);
ctx.fillRect(50, 50, 100, 100);
