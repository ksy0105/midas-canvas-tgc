import {initCanvas} from '../common.ts';

const draw3_14_1 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);

    const bg = new Image();
    bg.src = 'src/images/prague.png';

    const player = new Image();
    player.src = 'src/images/favicon.png';

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

        ctx.drawImage(player, playerX, playerY, 60, 60);
    }

    setInterval(animate, 30);
};

export default draw3_14_1;
