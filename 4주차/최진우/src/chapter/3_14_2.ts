import {initCanvas} from '../common.ts';

const draw3_14_2 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);

    const bg = new Image();
    bg.src = 'src/images/prague.png';

    const player = new Image();
    player.src = 'src/images/favicon.png';

    let speed = 5;
    let keyCodeValue = '';

    let bgX = 0;
    // const bgY = 0;
    // const bgW = bg.width;
    // const bgH = bg.height;

    let playerX = 30;
    let playerY = 150;
    // const playerW = player.width;
    // const playerH = player.height;

    const animate = () => {
        ctx.drawImage(bg, bgX--, 0);

        if (bgX <= -600) {
            bgX = 0;
        }

        if (keyCodeValue === 'w') {
            playerY -= speed;
        } else if (keyCodeValue === 's') {
            playerY += speed;
        } else if (keyCodeValue === 'a') {
            playerX -= speed;
        } else if (keyCodeValue === 'd') {
            playerX += speed;
        }

        ctx.drawImage(player, playerX, playerY, 60, 60);
    };

    document.getElementById(canvasId)!.addEventListener('keydown', (e: KeyboardEvent) => {
        keyCodeValue = e.key;
    });

    document.getElementById(canvasId)!.addEventListener('keyup', () => {
        keyCodeValue = '';
    });

    setInterval(animate, 30);
};

export default draw3_14_2;
