import {useCanvas} from "../../hooks/useCanvas.ts";
import {useState} from 'react';

interface ISnow {
    x: number;
    y: number;
    size: number;
}

let snowMakes: ISnow[] = [];

const WinterParticleNight = () => {
    // 이미지 로드 확인용
    const [isImgLoaded, setIsImgLoaded] = useState(false);

    const bgImg = new Image();
    bgImg.src = '/winternight.jpg';
    bgImg.onload = () => setIsImgLoaded(true);

    const ctxW = bgImg.width + 100;
    const ctxH = bgImg.height + 100;

    const totalCount = 350;

    const addSnowMake = () => {
        if(snowMakes.length > totalCount) {
            return;
        }

        let x = Math.floor(Math.random() * ctxW)  - 100;
        let y = 0;
        let size = Math.floor(Math.random() * 3)  + 1;

        snowMakes.push({
            x, y, size
        });
    }

    const snow = (ctx: CanvasRenderingContext2D) => {
        addSnowMake();
        ctx.fillStyle = 'rgba(255,255,255,0.75)';

        snowMakes.forEach((item, idx) => {
            ctx.beginPath();

            item.y += item.size * 0.5;
            ctx.arc(item.x, item.y, item.size * 0.5, 0, Math.PI * 2);

            ctx.fill();

            if(item.y > ctxH) {
                snowMakes.splice(idx, 1);
            }
        });
    }

    const displayCount = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial, Sans-serif';
        ctx.fillText(`${snowMakes.length}`, 10, 20);
    }

    const animate = (ctx: CanvasRenderingContext2D) => {
        if(!isImgLoaded) return;

        ctx.save(); // 설정 값을 저장해둠

        ctx.clearRect(0,0, ctxW, ctxH);
        ctx.drawImage(bgImg, 0,0);
        displayCount(ctx);

        ctx.rotate(-0.2);
        snow(ctx);

        ctx.restore(); // 설정 값을 우너복
    };

    const ref = useCanvas(bgImg.width, bgImg.height, animate);

    return <canvas ref={ref} style={{border: '1px solid black'}}/>
}

export default WinterNight