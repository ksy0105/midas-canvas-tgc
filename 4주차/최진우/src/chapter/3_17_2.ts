import {initCanvas} from '../common.ts';

const draw3_17_2 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;
    const speed = 5;
    let keysDown: { [key: string]: boolean } = {};

    // 비행기 이미지
    const playerImg = new Image();
    playerImg.src = 'src/images/blueFighter.png';

    let playerX = canW * 0.5 - 25;
    let playerY = 300;
    const playerW = 50;
    const playerH = 45;
    let playerMissiles:any[] = [];

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);

        if ('a' in keysDown) {
            playerX -= speed;
        } else if ('d' in keysDown) {
            playerX += speed;
        }

        if (playerX < 0) {
            playerX = 0;
        } else if (playerX > canW - playerW) {
            playerX = canW - playerW;
        }

        for (let i = 0; i < playerMissiles.length; i++) {
            const m = playerMissiles[i];

            ctx.fillStyle = m.bg;
            ctx.fillRect(m.x, m.y -= 5, m.w, m.h);

            if (m.y <= 0) {
                playerMissiles.splice(i, 1);
            }
        }

        ctx.strokeStyle = 'red';
        ctx.strokeRect(playerX, playerY, playerW, playerH);
        ctx.drawImage(playerImg, playerX, playerY);
    }

    // 키보드 눌렀을 때
    document.getElementById(canvasId)!.addEventListener('keydown', (e: KeyboardEvent) => {
        keysDown[e.key] = true;

        if (e.key === " ") {
            playerMissiles.push({x: playerX + playerW * 0.5, y: playerY - 5, w: 3, h: 10, bg: 'red'});
        }

        console.log(keysDown);
    });

    // 키보드 뗐을 때
    document.getElementById(canvasId)!.addEventListener('keyup', (e: KeyboardEvent) => {
        delete keysDown[e.key];

        console.log(keysDown);
    });

    setInterval(animate, 30);
};

export default draw3_17_2;
