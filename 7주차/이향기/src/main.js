import './style.css';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

const img = document.querySelector('#img');
ctx.drawImage(img, 0, 0);

let startX = 0;
let startY = 0;
const arrCoords = [];

let totalPoint = 31;
const finishImage = new Image();
finishImage.src = '/images/dottodot_airplane_finish.png';

ctx.canvas.addEventListener('click', (e) => {
    if (arrCoords.length >= totalPoint) return;

    const mouseX = e.clientX - ctx.canvas.offsetLeft;
    const mouseY = e.clientY - ctx.canvas.offsetTop;
    const radius = 8;

    if (arrCoords.length === 0) {
        startX = mouseX - 5;
        startY = mouseY;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    } else {
        ctx.moveTo(startX, startY);
        startX = mouseX - 5;
        startY = mouseY;
        ctx.lineTo(startX, startY);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, 6.28);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();

    const coordcnt = arrCoords.length + 1;
    ctx.font = 'normal bold 8px Arial, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(coordcnt, mouseX - 3, mouseY + 4);

    arrCoords.push(`${startX},${startY}`);
    console.log(arrCoords);


    if (arrCoords.length === totalPoint) {
        setTimeout(() => {
            alert('Goooooooooooooooooood!');
            render();
        }, 0);
    }
});

function render() {
    ctx.drawImage(finishImage, 0, 0);
}
