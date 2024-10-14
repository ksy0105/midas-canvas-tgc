import {useCanvas} from "../../hooks/useCanvas.ts";

interface IParticle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
}

let particles: IParticle[] = [];

const Flame = () => {
    const totalCount = 30;
    const ctxW = 500;
    const ctxH = 500;

    //중력
    let gravity = 1;

    const addParticle = () => {
        if (particles.length >= totalCount) {
            return;
        }

        let x = ctxW / 2;
        let y = ctxH / 4;
        let size = 3;

        // 초속도
        let vx = Math.random() * 20 - 10;
        let vy = Math.random() * 20 - 15;

        particles.push({
            x, y, size, vx, vy
        });
    };

    const particle = (ctx: CanvasRenderingContext2D) => {
      addParticle();

      particles.forEach((item, idx) => {
            ctx.beginPath();
            ctx.fillStyle = 'white';

            // 그라데이션 넣기
            let grad = ctx.createLinearGradient(100, 0, 300, 0);
            grad.addColorStop(0, 'white');
            grad.addColorStop(0.25, 'yellow');
            grad.addColorStop(0.5, 'red');
            grad.addColorStop(0.75, 'yellow');
            grad.addColorStop(1, 'white');

            ctx.fillStyle = grad;

            item.x += item.vx;
            item.y += item.vy;
            item.vy += gravity;

            ctx.arc(item.x, item.y, item.size, 0, Math.PI*2);
            ctx.fill();

            if(item.y > ctxH){
              particles.splice(idx, 1);
            }
      });
    };

    const animate = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, ctxW, ctxH);

        particle(ctx);
    };

    const ref = useCanvas(ctxW, ctxH, animate);

    return <canvas ref={ref} style={{border: '1px solid black'}}/>
}

export default Flame