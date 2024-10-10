import {useEffect, useRef, useState} from "react";
import CanvasComponent from "../../CanvasComponent.tsx";
import PlayerVO, {MissileVO} from "./vo/PlayerVO.tsx";
import EnemyListVO from "./vo/EnemyVO.tsx";

let animateInterval: number | null = null;

const ShootingCollision = () => {
    const speed = 5;

    const ref = useRef<HTMLCanvasElement>(null);


    const enemyList = new EnemyListVO();
    const [player, setPlayer] = useState(new PlayerVO());
    const [ctxObj, setCtxObj] = useState<CanvasRenderingContext2D | null>(null);

    const gameOver = () => {
        if(!ctxObj || !ref.current) return;
        const canW = ref.current.width;
        const canH = ref.current.height;

        if(animateInterval) {
            clearInterval(animateInterval);
        }

        ctxObj.font = 'bold 30px Arial, sans-serif';
        ctxObj.fillStyle = '#FC0';
        ctxObj.textAlign = 'center';

        ctxObj.fillText('you win', canW * 0.5, canH * 0.5);
    }

    const animate = () => {
        if(!ctxObj || !ref.current) return;

        ctxObj.clearRect(0, 0, ref.current.width, ref.current.height);
        player.render(ctxObj, enemyList);

        if(enemyList.enemies.length === 0) {
            gameOver();
        } else {
            enemyList.render(ctxObj, 0.5);
        }
    }

    const update = (code: string) => {
        if(!ref.current) return;

        const canW = ref.current.width;

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
        } else if(player.x > (canW - player.w)) {
            player.x = canW - player.w;
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

    const draw = (ctx: CanvasRenderingContext2D) => {
        setCtxObj(ctx);
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

    useEffect(() => {
        if(ctxObj){
            animateInterval = setInterval(animate, 30);
        }
    }, [ctxObj]);

    useEffect(() => {
        if(ref.current) {
            player.init(ref.current.width);
            setPlayer(player);
        }
    }, [ref.current]);

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <strong style={{fontSize: 20}}> z: 왼쪽 이동 x: 오른쪽 이동, 스페이스바: 미사일</strong>
            <CanvasComponent draw={draw} ref={ref}/>
        </div>
    );
}

export default ShootingCollision;