const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const flower = new Image();
flower.src = "images/flower.png";
flower.onload = function() {
    ctx.fillStyle = ctx.createPattern(flower, 'repeat');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
