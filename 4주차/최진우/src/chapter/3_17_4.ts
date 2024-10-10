import {initCanvas} from '../common.ts';

const draw3_17_4 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;
    let keysDown = {};

    // 배경 이미지
    const bgImg = new Image();
    bgImg.src = 'src/images/background.png';

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
    // const playerH = 45;
    const playerSpeed = 5;
    let playerMissiles:any[] = [];

    const gameOver = () => {
        clearInterval(objAnimate);
        ctx.font = 'bold 36px Arial, sans-serif';
        ctx.fillStyle = '#fc0';
        ctx.textAlign = 'center';
        ctx.fillText('You Win!', canW * 0.5, canH * 0.5);
    }

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);
        ctx.drawImage(bgImg, 0, 0);

        for (let i = 0; i < enemies.length; i++) {
            const e = enemies[i];
            let enemyY;

            enemyY = e.y += enemySpeed;
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

            for (let j = 0; j < enemies.length; j++) {
                const e = enemies[j];
                if (m.x >= e.x && m.x <= e.x + enemyW && m.y >= e.y && m.y <= e.y + enemyH) {
                    enemies.splice(j, 1);
                    playerMissiles.splice(i, 1);
                }
            }

            if (m.y <= 0) {
                playerMissiles.splice(i, 1);
            }
        }

        ctx.drawImage(playerImg, playerX, playerY);

        // game over
        if (enemies.length === 0) {
            setTimeout(gameOver, 50);
        }
    }

    // 키보드 눌렀을 때
    document.getElementById(canvasId)!.addEventListener('keydown', (e: KeyboardEvent) => {
        keysDown[e.key] = true;

        if (e.key === " ") {
            playerMissiles.push({x: playerX + playerW * 0.5, y: playerY - 5, w: 3, h: 10, bg: 'red'});
        }
    });

    // 키보드 뗐을 때
    document.getElementById(canvasId)!.addEventListener('keyup', (e: KeyboardEvent) => {
        delete keysDown[e.key];
    });

    const objAnimate = setInterval(animate, 30);
};

export default draw3_17_4;
