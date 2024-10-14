import {useEffect, useState} from "react";
import PlayerVO, {MissileVO} from "./vo/PlayerVO.tsx";
import EnemyListVO from "./vo/EnemyVO.tsx";
import {useCanvas} from "../../../hooks/useCanvas.ts";

let animateInterval: number | null = null;

const ShootingCollision = () => {
    const speed = 5;
    const canvasWidth = 500;
    const canvasHeight = 500;

    const enemyList = new EnemyListVO();
    const [player, setPlayer] = useState(new PlayerVO());

    const gameOver = (ctx: CanvasRenderingContext2D) => {
        if(!ctx) return;

        if(animateInterval) {
            clearInterval(animateInterval);
        }

        ctx.font = 'bold 30px Arial, sans-serif';
        ctx.fillStyle = '#FC0';
        ctx.textAlign = 'center';

        ctx.fillText('you win', canvasWidth * 0.5, canvasHeight * 0.5);
    }

    const animate = (ctx: CanvasRenderingContext2D) => {
        if(!ctx) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        player.render(ctx, enemyList);

        if(enemyList.enemies.length === 0) {
            gameOver(ctx);
        } else {
            enemyList.render(ctx, 0.5);
        }
    }

    const update = (code: string) => {
        switch (code) {
            case  'z':
                player.x -= speed;
                return;
            case  'x':
                player.x += speed;
                return;
        }

        // 화면 밖으로 나가는 것 방지 코드
        if(player.x < 0) {
            player.x = 0;
        } else if(player.x > (canvasWidth - player.w)) {
            player.x = canvasWidth - player.w;
        }

        if(code === ' '){
            player.missiles.push(new MissileVO({
                x: player.x + player.w * 0.5,
                y: player.y - 5,
                w: 3,
                h: 10
            }));
        }

        setPlayer(new PlayerVO(player));
    }

    useEffect(() => {
        window.addEventListener('keydown',(e) => {
            update(e.key);
        });

        return () => {
            if(animateInterval) {
                clearInterval(animateInterval);
            }

            window.removeEventListener('keydown',(e) => {
                update(e.key);
            });
        }
    }, []);

    const ref = useCanvas(canvasWidth, canvasHeight, animate);

    return (
        <canvas ref={ref}/>
    );
}

export default ShootingCollision;