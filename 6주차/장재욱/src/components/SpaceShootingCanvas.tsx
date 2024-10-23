import { useEffect, useRef, useState} from "react";
import "./spaceShootinhCanvas.css";
import Background from "../objects/background.ts";
import Fighter from "../objects/fighter.ts";
import Asteroid from "../objects/asteroid.ts";

const SpaceShootingCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const animationId = useRef<number | null>(null);
    const [audioOn, setAudioOn] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(2);
    const [isGameOver, setIsGameOver] = useState(false);
    const isGameOverRef = useRef(false);
    const gameOverSound = useRef(new Audio("./src/assets/game_over.wav"));

    useEffect(() => {
        drawCanvas();
        return () => {
            if (animationId.current) cancelAnimationFrame(animationId.current);
        }
    }, []);

    const drawCanvas = async () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const background = new Background(ctx);
                const fighter = new Fighter(50, 50, 3, ctx);
                const asteroid = new Asteroid(ctx);

                let lastUpdateTime = 0;
                let acDelta = 0;
                let msPerFrame = 1000;

                gameOverSound.current.loop = true;
                gameOverSound.current.volume = .25;
                gameOverSound.current.load();

                await Promise.all([
                    background.loadImage(), fighter.loadImage(), asteroid.loadImage(),
                ]);

                fighter.addKeyboardEventListener();

                const detectCollision = (fighter: Fighter, asteroid: Asteroid) => {
                    const aw = asteroid.image!.width * asteroid.randScale;
                    const ah = asteroid.image!.height * asteroid.randScale;
                    const fw = fighter.bodyImage!.width;
                    const fh = fighter.bodyImage!.height;

                    // 운석이 화면 밖에 있을 때 충돌 감지 방지 (왼쪽 & 오른쪽)
                    if (asteroid.x + aw < 0 || asteroid.x > ctx.canvas.width) return;

                    // 레이저 충돌
                    if (fighter.lasers.length) {
                        for (let i = 0; i < fighter.lasers.length; i++) {
                            if (fighter.lasers[i][0] > asteroid.x && fighter.lasers[i][0] < asteroid.x + aw
                                && fighter.lasers[i][1] > asteroid.y && fighter.lasers[i][1] < asteroid.y + ah) {
                                asteroid.hitExplosion.x = fighter.lasers[i][0];
                                asteroid.hitExplosion.y = fighter.lasers[i][1];
                                asteroid.boolHitExplosion = true;

                                fighter.explodeSoundPlay();

                                fighter.lasers.splice(i, 1);
                                asteroid.reset();

                                // 점수 증가
                                setScore(score => score + 100);
                            }
                        }
                    }

                    const isCollision = (
                        (fighter.x > asteroid.x && fighter.x < asteroid.x + aw &&
                            fighter.y > asteroid.y && fighter.y < asteroid.y + ah) ||

                        (fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw &&
                            fighter.y > asteroid.y && fighter.y < asteroid.y + ah) ||

                        (fighter.x > asteroid.x && fighter.x < asteroid.x + aw &&
                            fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah) ||

                        (fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw &&
                            fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah)
                    );

                    // 비행기 충돌
                    if (isCollision) {
                        fighter.boolFireExplosion = true;
                        asteroid.boolHitExplosion = true;
                        asteroid.hitExplosion.x = asteroid.x;
                        asteroid.hitExplosion.y = asteroid.y;

                        asteroid.explodeSoundPlay();

                        fighter.reset();
                        asteroid.reset();

                        setLives(lives => {
                            if (lives > 0) {
                                if (lives === 1) {
                                    setIsGameOver(true);
                                    isGameOverRef.current = true;
                                    fighter.lasers = [];

                                    const audio = audioRef.current;
                                    if (audio) {
                                        if (!audio.paused) {
                                            audio.pause();
                                            audio.currentTime = 0;

                                            gameOverSound.current.currentTime = 0;
                                            gameOverSound.current.play();
                                        }
                                    }
                                }
                                return lives - 1;
                            }
                            else {
                                return lives;
                            }
                        });
                    }
                }

                const render = () => {
                    const delta = Date.now() - lastUpdateTime;

                    if (acDelta > msPerFrame) {
                        acDelta = 0;

                        background.draw();
                        fighter.draw();
                        asteroid.draw();

                        if (asteroid.boolHitExplosion && !isGameOverRef.current) asteroid.drawExplode();
                    } else {
                        acDelta += delta;
                    }
                }

                const drawAnimation = () => {
                    fighter.update();
                    detectCollision(fighter, asteroid);

                    if (!isGameOverRef.current) render();

                    animationId.current = requestAnimationFrame(drawAnimation);
                }

                drawAnimation();
            }
        }
    }

    const restart = () => {
        setIsGameOver(false);
        isGameOverRef.current = false;
        setLives(2);
        setScore(0);

        const audio = audioRef.current;

        if (audio) {
            if (audioOn) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        gameOverSound.current.currentTime = 0;
        gameOverSound.current.pause();
    }

    const triggerAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            if (audioOn) {
                setAudioOn(false);
            } else {
                setAudioOn(true);
            }
        }

        if (isGameOverRef.current) {
            if (audioOn) {
                gameOverSound.current.pause();
            } else {
                gameOverSound.current.play();
            }
        } else {
            if (audio) {
                if (audioOn) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
        }
    }

    return (
        <div className={"canvas_container"}>
            <div onClick={triggerAudio} className={`sound ${audioOn ? 'sound-on' : 'sound-off'}`}></div>
            <div className={"lives"}>LIVE: <span>{lives}</span></div>
            <div className={"score"}>SCORE: <span>{score}</span></div>
            {
                isGameOver && <div className={"game-over"}>GAME OVER
                    <p onClick={restart}><span>[Restart]</span></p>
                </div>
            }
            <audio className={"myAudio"} ref={audioRef} loop>
                <source src={"./src/assets/bg.mp3"} type={"audio/mpeg"}/>
            </audio>
            <canvas ref={canvasRef} width={600} height={400}/>
        </div>
    );
};

export default SpaceShootingCanvas;