const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#6495ED";
ctx.font = "bold 20px Arial, sans-serif";
ctx.textBaseline = "top"; //textAlign="alphabetic|top|hanging|middle|ideographic|bottom";
ctx.fillText("top!", 10, 150);
ctx.textBaseline = "bottom";
ctx.fillText("bottom!", 50, 150);
ctx.textBaseline = "middle";
ctx.fillText("middle!", 130, 150);
ctx.textBaseline = "alphabetic";
ctx.fillText("alphabetic!", 210, 150);
ctx.textBaseline = "hanging";
ctx.fillText("hanging!", 310, 150);
ctx.strokeStyle="red";
ctx.moveTo(10,150);
ctx.lineTo(390,150);
ctx.stroke();
