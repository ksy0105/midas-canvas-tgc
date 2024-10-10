import {initCanvas} from '../common.ts';

const draw3_17_3 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;
    let keysDown = {};

    // 적기 이미지
    const enemyImg = new Image();
    enemyImg.src = 'src/images/enemyFighter.png';

    const enemies = [
        {id: 'enemy1', x: 80, y: -70, w: 43, h: 61},
        {id: 'enemy2', x: 180, y: -70, w: 43, h: 61},
        {id: 'enemy3', x: 280, y: -70, w: 43, h: 61},
    ];

    const enemyW = 43;
    const enemyH = 61;
    const enemySpeed = 0.5;

    // 비행기 이미지
    const playerImg = new Image();
    playerImg.src = 'src/images/blueFighter.png';

    let playerX = canW * 0.5 - 25;
    let playerY = 300;
    const playerW = 50;
    const playerH = 45;
    const playerSpeed = 5;
    let playerMissiles:any[] = [];

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);

        for (let i = 0; i < enemies.length; i++) {
            const e = enemies[i];
            let enemyY;

            enemyY = e.y += enemySpeed;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(e.x, enemyY, enemyW, enemyH);
            ctx.drawImage(enemyImg, e.x, enemyY);
        }

        if ('a' in keysDown) {
            playerX -= playerSpeed;
        } else if ('d' in keysDown) {
            playerX += playerSpeed;
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

export default draw3_17_3;
