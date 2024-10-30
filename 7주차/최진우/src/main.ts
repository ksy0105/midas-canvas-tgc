import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const ctx = canvas.getContext('2d')!;

const point = [
    {x: 251, y: 148},
    {x: 81, y: 69},
    {x: 30, y: 77},
    {x: 149, y: 181},
    {x: 110, y: 210},
    {x: 62, y: 164},
    {x: 93, y: 224},
    {x: 80, y: 243},
    {x: 109, y: 243},
    {x: 152, y: 298},
    {x: 142, y: 255},
    {x: 190, y: 252},
    {x: 220, y: 288},
    {x: 214, y: 313},
    {x: 265, y: 288},
    {x: 234, y: 280},
    {x: 210, y: 242},
    {x: 224, y: 237},
    {x: 500, y: 390},
    {x: 560, y: 349},
    {x: 329, y: 194},
    {x: 446, y: 128},
    {x: 503, y: 158},
    {x: 531, y: 140},
    {x: 467, y: 107},
    {x: 470, y: 21},
    {x: 444, y: 27},
    {x: 420, y: 84},
    {x: 370, y: 65},
    {x: 343, y: 80},
    {x: 392, y: 105},
]

// 이미지 가져오기
const img = document.querySelector('#img') as HTMLImageElement;
ctx.drawImage(img, 0, 0);

// 게임 진행 순서
// 1. 1번을 클릭하였을 때 마우스 좌표를 가져옴
// 2. moveTo 함수를 이용하여 첫 시작 위치를 결정
// 3. 2번을 클릭하였을 때 마우스 좌표를 가져옴
// 4. lineTo 함수를 이용하여 1번부터 2번까지 선을 그림

let startX = 0;
let startY = 0;
let arrCoords = [];
const totalPoint = 31;
const finishImage = new Image();
finishImage.src = './src/images/airplane_finish.png';

// 마우스 클릭시 선 그리기
ctx.canvas.addEventListener('click', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    const radius = 8;
    // console.log(`${mouseX} : ${mouseY}`);

    // 총 포인트의 개수를 넘으면 리턴
    if (arrCoords.length > totalPoint) {
        return;
    }

    // 선 그리기
    if (arrCoords.length === 0) {
        if (point[0].x - 3 <= mouseX && mouseX <= point[0].x + 3 && point[0].y - 3 <= mouseY && mouseY <= point[0].y + 3) {
            point.splice(0, 1);
            startX = mouseX;
            startY = mouseY;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        } else {
            return;
        }
    } else {
        if (point[0].x - 3 <= mouseX && mouseX <= point[0].x + 3 && point[0].y - 3 <= mouseY && mouseY <= point[0].y + 3) {
            point.splice(0, 1);
            ctx.moveTo(startX, startY);
            startX = mouseX;
            startY = mouseY;
            ctx.lineTo(startX, startY);
        } else {
            return;
        }
    }
    ctx.stroke();

    // 원 그리기
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();

    // 텍스트 그리기
    const coordcnt = arrCoords.length + 1;
    ctx.font = 'normal bold 8px Arial, sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText(String(coordcnt), mouseX - 3, mouseY + 4);

    // 배열에 담기
    arrCoords.push(`${mouseX}, ${mouseY}`);

    setTimeout(() => {
        // 총 포인트의 개수와 같으면 완성된 이미지 노출
        if (arrCoords.length === totalPoint) {
            render();
        }
    }, 100);
});

const render = () => {
    ctx.drawImage(finishImage, 0, 0);

    setTimeout(() => {
        document.getElementById('finishArea')!.style.display = 'flex';
    }, 1000);
}

document.querySelector('#restart')?.addEventListener('click', () => {
    location.reload();
});
