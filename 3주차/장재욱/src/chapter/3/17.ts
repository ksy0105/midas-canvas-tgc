import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

type MissileType = {
    x: number;
    y: number;
    bg: string;
    w: number;
    h: number;
}

// 비행기를 화면 하단에 배치하여 좌우로 움직임 구현하기
const execute3_17_1 = async (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);
    const canW = ctx.canvas.width;
    const canH = ctx.canvas.height;
    const SPEED = 5 as const;
    const ENEMY_SPEED = 0.5 as const;
    const keysDown: {
        [key: number]: boolean
    } = {};
    const missiles: MissileType[] = [];

    const fighterImage = new Image();
    fighterImage.src = "BlueFighter.png";

    const enemyImage = new Image();
    enemyImage.src = "EnemyFighter.png";

    const enemies = [
        {id: "enemy1", x: 100, y: -70, w: 43, h: 61},
        {id: "enemy2", x: 200, y: -70, w: 43, h: 61},
        {id: "enemy3", x: 300, y: -70, w: 43, h: 61},
    ]

    class Player {
        x: number;
        y: number;
        w: number;
        h: number;

        constructor() {
            this.x = canW * 0.5 - 25;
            this.y = 250;
            this.w = 50;
            this.h = 45;
        }

        render() {
            ctx.drawImage(fighterImage, this.x, this.y);

            // 미사일 이동
            for (let i = 0; i < missiles.length; i++) {
                const m = missiles[i];
                ctx.fillStyle = m.bg;
                ctx.fillRect(m.x, m.y -= 5, m.w, m.h);

                // 미사일 적기 충돌 체크
                checkCollision(m, i);

                // 화면 밖 미사일 삭제
                if (m.y <= 0) {
                    missiles.splice(i, 1);
                }
            }
        }
    }

    class Enemy {
        w: number;
        h: number;

        constructor() {
            this.w = 43;
            this.h = 61;
        }

        render() {
            if (enemies.length === 0) {
                gameover();
                return;
            }

            for (let i = 0; i < enemies.length; i++) {
                const enemyY = enemies[i].y += ENEMY_SPEED;
                ctx.drawImage(enemyImage, enemies[i].x, enemyY);
            }
        }
    }

    function checkCollision (m: MissileType, mi: number) {
        for (let i = 0; i < enemies.length; i++) {
            const e = enemies[i];

            if (m.x > e.x && m.x <= e.x + e.w && m.y >= e.y && m.y <= e.y + e.h) {
                missiles.splice(mi, 1);
                enemies.splice(i, 1);
            }
        }
    }

    function gameover() {
        clearInterval(objAnimate);
        ctx.font = "bold 36px Arial, sans-serif";
        ctx.fillStyle = "#FC0";
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN!", canW * 0.5, 150);
    }

    function update() {
        // 좌우 움직임
        if (65 in keysDown) player.x -= SPEED;
        else if (68 in keysDown) player.x += SPEED;

        if (player.x < 0) player.x = 0;
        else if (player.x > (canW - player.w)) player.x = canW - player.w;
    }

    document.addEventListener('keydown', (event) => {
        keysDown[event.keyCode] = true;

        if (event.keyCode === 32) {
            missiles.push({
                x: player.x + player.w * 0.5,
                y: player.y - 5,
                w: 3,
                h: 10,
                bg: 'red',
            })
        }
        // const key = String.fromCharCode(event.keyCode);
        // if (key === "A" || key === "D") keyCodeValue = key;
    })

    document.addEventListener('keyup', (event) => {
        delete keysDown[event.keyCode]
    })

    const player = new Player();
    const enemy = new Enemy();

    function animate() {
        ctx.clearRect(0, 0, canW, canH);
        update();
        player.render();
        enemy.render();
    }

    const objAnimate = setInterval(animate, 30);
}

const execute3_17 = () => {
    const id = 'chapter3_17'

    makeCanvasContainer(id, '3.17. 슈팅 충돌 체크하기', async () => {
        await execute3_17_1(id);
    });
}

export default execute3_17;