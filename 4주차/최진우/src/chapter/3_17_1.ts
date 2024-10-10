import {initCanvas} from '../common.ts';

const draw3_17_1 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;
    const speed = 5;
    let keyCodeValue = '';

    // 비행기 이미지
    const playerImg = new Image();
    playerImg.src = 'src/images/blueFighter.png';

    let playerX = canW * 0.5 - 25;
    let playerY = 300;
    const playerW = 50;
    const playerH = 45;

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);

        if (keyCodeValue === 'a') {
            playerX -= speed;
        } else if (keyCodeValue === 'd') {
            playerX += speed;
        }

        if (playerX < 0) {
            playerX = 0;
        } else if (playerX > canW - playerW) {
            playerX = canW - playerW;
        }

        ctx.strokeStyle = 'red';
        ctx.strokeRect(playerX, playerY, playerW, playerH);
        ctx.drawImage(playerImg, playerX, playerY);
    }

    // 키보드 눌렀을 때
    document.getElementById(canvasId)!.addEventListener('keydown', (e: KeyboardEvent) => {
        keyCodeValue = e.key;
    });

    // 키보드 뗐을 때
    document.getElementById(canvasId)!.addEventListener('keyup', () => {
        keyCodeValue = '';
    });

    setInterval(animate, 30);
};

export default draw3_17_1;
