const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#6495ED";
ctx.font = "italic bold 40px Arial, sans-serif";
ctx.fillText("Hello Canvas World!", 10, 100);
ctx.lineWidth = 2;
ctx.strokeText("Hello Canvas World!", 10, 100);
