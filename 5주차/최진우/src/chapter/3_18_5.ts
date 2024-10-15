import {initCanvas} from '../common.ts';

const draw3_18_5 = (subTitle: string, id: string, canvasId: string) => {
    const {canvas, ctx} = initCanvas(subTitle, id, canvasId);
    const canW = canvas.width;
    const canH = canvas.height;

    const bgImg = new Image();
    bgImg.src = 'src/images/winternight.jpg';

    type SnowflakeType = {
        x: number;
        y: number;
        size: number;
    }

    const snowflakes: SnowflakeType[] = [];

    const addSnowflake = () => {
        const x = Math.floor(Math.random() * canW) + 1;
        let y = 0;
        const size = Math.floor(Math.random() * 3) + 1;

        snowflakes.push({'x': x, 'y': y, 'size': size});
    };

    const snow = () => {
        addSnowflake();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        for(let i = 0; i < snowflakes.length; i++) {
            ctx.beginPath();
            const ty = snowflakes[i].y += snowflakes[i].size * 0.5;
            ctx.arc(snowflakes[i].x, ty, snowflakes[i].size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            if(snowflakes[i].y > canH) {
                snowflakes.splice(i, 1);
            }
        }
    }

    const displayCount = () => {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.fillText(String(snowflakes.length), 10, 20);
    }

    const animate = () => {
        ctx.clearRect(0, 0, canW, canH);
        ctx.drawImage(bgImg, 0, 0, canW, canH);

        snow();
        displayCount();
    }

    setInterval(animate, 30);
};

export default draw3_18_5;
