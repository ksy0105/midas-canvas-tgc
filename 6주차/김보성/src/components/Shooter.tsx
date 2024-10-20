import {useCanvas} from "../hooks/useCanvas";
import FighterVO from "./vo/FighterVO";
import LaserVO from "./vo/LaserVO";
import {useLoadImage} from "../hooks/useLoadImage";
import {useKeydownEvent} from "../hooks/useKeyBoadEvents";
import BackgroundVO from "./vo/BackgroundVO.ts";
import AsteroidVO from "./vo/AsteroidVO.ts";
import HitExplosionVO from "./vo/HitExplosionVO.ts";

// 캔버스 사이즈
const ctxW = 600;
const ctxH = 400;

// 비행기 객체
const fighter = new FighterVO({
    x: 50,
    y: 400 / 2,
    speed: 5,
    ctxW,
    ctxH
});

const background = new BackgroundVO({
    x: 0,
    y: 0,
    ctxW,
    ctxH
});

const asteroid = new AsteroidVO({
    x: ctxW,
    y: Math.floor(Math.random() * 350),
    speed: 10,
    ctxW,
    ctxH
});

let hitExplosion = new HitExplosionVO();
let spriteCount = 1;

// 레이저 관련
let lasers: LaserVO[] = [];
const laserTotal = 10;

// 프레임 시간 조절하는 변수
let lastUpdateTime = Date.now();
let acDelta = 0;
let msPerFrame = 100;

const Shooter = () => {
    const { isCompleted, bgImg, fighterImg, laserImg, asteroidImg, explodeImg } = useLoadImage();

    const drawHitExplosion= (ctx: CanvasRenderingContext2D) => {
        if(!hitExplosion.isVisibleHit) return;

        // 폭발 스프라이트 그리기
        ctx.drawImage(explodeImg,
            spriteCount * 39, 0,
            39, 40,
            hitExplosion.x, hitExplosion.y,
            39 * (1 + hitExplosion.randScale), 40 * (1 + hitExplosion.randScale)
        );

        // 폭발 스프라이트 번호를 증가 시킴
        spriteCount++;

        // 스포라이트가 끝날 경우 이미지 표시 종료 시킴
        if(spriteCount > 13) {
            spriteCount = 1;
            hitExplosion.setIsVisibleHit(false);
        }
    }

    const detectCollision = () => {
        // 운석의 크기 결정
        let aw = asteroidImg.width * asteroid.randScale;
        let ah = asteroidImg.height * asteroid.randScale;

        if(lasers.length) {
            lasers.forEach((item, idx) => {
                if(item.x > asteroid.x && item.x < asteroid.x + aw
                 && item.y > asteroid.y && item.y < asteroid.y + ah) {
                    // 충돌 위치 입력
                    hitExplosion = new HitExplosionVO({
                        x: item.x,
                        y: item.y,
                        randScale: asteroid.randScale,
                        isVisibleHit: true
                    });

                    lasers.splice(idx, 1);
                    asteroid.reset();
                }
            })
        }
    }

    const moveAsteroid= (ctx: CanvasRenderingContext2D) => {
        // 운석의 크기 결정
        let w = asteroidImg.width * asteroid.randScale;
        let h = asteroidImg.height * asteroid.randScale;

        // 운석이 회전할 때 생기는 좌표의 원점을 조정하는 값 (운석의 중앙 값)
        let coordX = (asteroidImg.width / 2) * asteroid.randScale;
        let coordY = (asteroidImg.height / 2) * asteroid.randScale;

        ctx.save();
        // 운석 이미지 기준점으로 좌표 이동
        ctx.translate(asteroid.x + coordX, asteroid.y + coordY);
        // 운석 회전 (매 프레임마다 5씩 회전)
        asteroid.setAng(5);
        ctx.rotate(Math.PI / 180 * asteroid.ang);
        // 위에 옮긴 운석이미지 기준점 좌표 이동을 다시 돌림
        ctx.translate(-asteroid.x - coordX,  -asteroid.y - coordY);

        // 운석을 왼쪽으로 이동시킴
        asteroid.moveX();
        ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, w, h);

        // 캔버스 사용하기 전 값을 되돌림
        ctx.restore();

        if(asteroid.x <= -100) {
            asteroid.reset();
        }
    }

    const drawLaser = (ctx: CanvasRenderingContext2D) => {
        if(lasers.length) {
            lasers.forEach((item, idx) => {
                ctx.drawImage(laserImg, item.x, item.y);

                item.moveX();

                if(item.x > ctxW) {
                    lasers.splice(idx, 1);
                }
            })
        }
    }

    const animate = (ctx: CanvasRenderingContext2D) => {
        if(isCompleted) return;

        let delta = Date.now() - lastUpdateTime;
        if(acDelta > msPerFrame) {
            acDelta = 0;

            ctx.drawImage(bgImg, background.x, background.y);
            background.moveX();

            ctx.drawImage(fighterImg, fighter.x, fighter.y);

            drawLaser(ctx);

            moveAsteroid(ctx);

            detectCollision();

            drawHitExplosion(ctx);

            lastUpdateTime = Date.now();
        } else {
            acDelta = delta;
        }
    };

    const ref = useCanvas(ctxW, ctxH, animate);

    useKeydownEvent((key) => {
        const {x, y} = fighter.update(key);

        // 스페이스바 키보드 이벤트시 미사일 객체 추가
        if(key == ' ' && lasers.length <= laserTotal){
            lasers.push(new LaserVO({
                x: x + 50,
                y: y + 10
            }));
        }
    });

    return <canvas ref={ref}/>
}

export default Shooter
