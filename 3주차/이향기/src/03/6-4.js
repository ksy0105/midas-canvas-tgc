const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#6495ED";
ctx.font = "italic bold 30px Arial, sans-serif";
ctx.textAlign = "start"; //textAlign="center|end|left|right|start";
ctx.fillText("Hello World!", 200, 50);
ctx.textAlign = "end";
ctx.fillText("Hello World!", 200, 100);
ctx.textAlign = "left";
ctx.fillText("Hello World!", 200, 150);
ctx.textAlign = "right";
ctx.fillText("Hello World!", 200, 200);
ctx.textAlign = "center";
ctx.fillText("Hello World!", 200, 250);
ctx.strokeStyle="red";
ctx.moveTo(200,20);
ctx.lineTo(200,370);
ctx.stroke();
