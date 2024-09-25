const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const grad = ctx.createLinearGradient(50, 50, 250, 50);
grad.addColorStop(0, 'red');
grad.addColorStop(1 / 6, 'orange');
grad.addColorStop(2 / 6, 'yellow');
grad.addColorStop(3 / 6, 'green');
grad.addColorStop(4 / 6, 'aqua');
grad.addColorStop(5 / 6, 'blue');
grad.addColorStop(1, 'purple');
ctx.lineWidth = 5;
ctx.fillStyle = grad;
ctx.fillRect(50,50,200,200);
ctx.strokeRect(50,50,200,200);
