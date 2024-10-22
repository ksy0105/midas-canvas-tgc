import {useCanvas} from "../hooks/useCanvas";
import FighterVO from "./vo/FighterVO";
import LaserVO from "./vo/LaserVO";
import {useLoadImage} from "../hooks/useLoadImage";
import {useKeydownEvent} from "../hooks/useKeyBoadEvents";
import BackgroundVO from "./vo/BackgroundVO.ts";
import AsteroidVO from "./vo/AsteroidVO.ts";
import HitExplosionVO from "./vo/HitExplosionVO.ts";
import SoundButton from "./SoundButton.tsx";
import {useEffect, useRef, useState} from "react";
import Lives from "./Lives.tsx";
import Score from "./Score.tsx";
import GameOVer from "./GameOVer.tsx";

// 캔버스 사이즈
const ctxW = 600;
const ctxH = 400;

// 비행기 객체
const fighter = new FighterVO({
    x: 50,
    y: ctxH / 2,
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

let lives = 2;
let score = 0;

const Shooter = () => {
    const { isCompleted, bgImg, fighterImg, laserImg, asteroidImg, explodeImg } = useLoadImage();

    const [isGameOver, setIsGameOver] = useState(false);

    const livesRef = useRef<HTMLSpanElement>(null);
    const scoreRef = useRef<HTMLSpanElement>(null);

    // 레이저 사운드
    const playLaserSound = () => {
        const sound = new Audio('/sounds/Laser.wav');
        sound.volume = 0.12;
        sound.load();
        sound.play();
    };

    //  비행기 충돌 사운드
    const playExplosionSound = () => {
        const sound = new Audio('/sounds/explosion.wav');
        sound.load();
        sound.play();
    };

    // 레이저 - 운석 충돌 사운드
    const playHitExplosionSound = () => {
        const sound = new Audio('/sounds/explosion-02.wav');
        sound.volume = 0.5;
        sound.load();
        sound.play();
    };

    const gameOver = () => {
        setIsGameOver(true);
    }

    const reStart = () => {
        setIsGameOver(false);

        lives = 2;
        score = 0;

        if(livesRef.current) {
            livesRef.current.innerText = `${lives}`;
        }
        if(scoreRef.current) {
            scoreRef.current.innerText = `${score}`;
        }
    }

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
        const aw = asteroidImg.width * asteroid.randScale;
        const ah = asteroidImg.height * asteroid.randScale;

        const fw = fighterImg.width;
        const fh = fighterImg.height;

        //비행기와 운석 충돌
        if(
            (
                fighter.x > asteroid.x && fighter.x < asteroid.x + aw &&
                fighter.y > asteroid.y && fighter.y < asteroid.y + ah
            ) ||
            (
                fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw &&
                fighter.y > asteroid.y && fighter.y < asteroid.y + ah
            ) ||
            (
                fighter.x > asteroid.x && fighter.x + fw < asteroid.x + aw &&
                fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah
            ) ||
            (
                fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw &&
                fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah
            )
        ) {
            hitExplosion = new HitExplosionVO({
                x: fighter.x,
                y: fighter.y,
                randScale: 1,
                isVisibleHit: true
            });

            // 새로운 비행기 등장 시키기 위해 사용하는 상태값
            fighter.setFighterExplosion(true);

            asteroid.reset();
            fighter.reset();
            playExplosionSound();

            if(lives <= 0) {
                lives = 0;
                gameOver();
            } else {
                --lives;
            }

            if(livesRef.current) {
                livesRef.current.innerText = `${lives}`;
            }
        }


        // 레이저와 운석 충돌 체크
        if(lasers.length) {
            lasers.forEach((item, idx) => {
                if(item.x > asteroid.x && item.x < asteroid.x + aw
                 && item.y > asteroid.y && item.y < asteroid.y + ah) {
                    // 충돌 위치 입력
                    hitExplosion = new HitExplosionVO({
                        x: asteroid.x,
                        y: asteroid.y,
                        randScale: asteroid.randScale,
                        isVisibleHit: true
                    });

                    lasers.splice(idx, 1);
                    asteroid.reset();
                    playHitExplosionSound();

                    score += 100;
                    if(scoreRef.current) {
                        scoreRef.current.innerText = `${score}`;
                    }
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

    const drawFighter = (ctx: CanvasRenderingContext2D) => {
        if(fighter.fighterExplosion) {
            // 비행기가 등장
            ctx.drawImage(fighterImg, fighter.x, fighter.y);
            fighter.moveX();

            if(fighter.x >= 50) {
                // 비행기 폭발 상태 값 초기화
                fighter.setFighterExplosion(false);
            }
        } else {
            ctx.drawImage(fighterImg, fighter.x, fighter.y);
        }
    }

    const animate = (ctx: CanvasRenderingContext2D) => {
        if(isCompleted) return;

        let delta = Date.now() - lastUpdateTime;

        if(acDelta > msPerFrame) {
            acDelta = 0;

            ctx.drawImage(bgImg, background.x, background.y);
            background.moveX();

            if(isGameOver) return;

            drawFighter(ctx);

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
            playLaserSound();
        }
    });

    useEffect(() => {
        if(livesRef.current) {
            livesRef.current.innerText = `${lives}`;
        }
    }, [livesRef.current]);

    useEffect(() => {
        if(scoreRef.current) {
            scoreRef.current.innerText = `${score}`;
        }
    }, [scoreRef.current]);

    return (
        <div style={{position: "relative", width: ctxW, height: ctxH}}>
            <Lives ref={livesRef}/>
            <Score ref={scoreRef}/>
            <SoundButton isGameOver={isGameOver}/>
            <GameOVer isGameOver={isGameOver} onReStart={reStart} />
            <canvas ref={ref}/>
        </div>
    );
}

export default Shooter
