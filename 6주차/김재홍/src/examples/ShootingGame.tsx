import { useEffect, useRef, useState } from "react";
import { loadImage } from "../utils";

interface Explosion {
  x: number;
  y: number;
}

interface Laser {
  x: number;
  y: number;
}

const ShootingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const fighterImgRef = useRef<HTMLImageElement | null>(null);
  const laserImgRef = useRef<HTMLImageElement | null>(null);
  const asteroidImgRef = useRef<HTMLImageElement | null>(null);
  const explodeImgRef = useRef<HTMLImageElement | null>(null);

  const fighter = useRef({ x: 50, y: 200, speed: 5 });
  const lasers = useRef<Laser[]>([]);
  const asteroid = useRef({ x: 600, y: Math.random() * 350 });

  const keysDownRef = useRef<{ [key: string]: boolean }>({});

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [isGameOver, setIsGameOver] = useState(false);

  const FIGHTER_WIDTH = 60;
  const FIGHTER_HEIGHT = 30;

  const speed = 0;
  const arrScale = [0.4, 0.6, 0.8, 1];
  let randomScale;

  const fetchImage = async () => {
    try {
      const bgImg = await loadImage("images/space.png");
      const fighterImg = await loadImage("images/fighter.png");
      const laserImg = await loadImage("images/laser.png");
      const asteroidImg = await loadImage("images/asteroid.png");
      const explodeImg = await loadImage("images/explode.png");

      bgImgRef.current = bgImg;
      fighterImgRef.current = fighterImg;
      laserImgRef.current = laserImg;
      asteroidImgRef.current = asteroidImg;
      explodeImgRef.current = explodeImg;
    } catch (error) {
      console.error("이미지 로드 실패:", error);
    }
  };

  const detectCollision = () => {
    if (!asteroidImgRef.current || !fighterImgRef.current) return;

    const randomScale = 1;
    const aw = asteroidImgRef.current.width * randomScale;
    const ah = asteroidImgRef.current.height * randomScale;
    const fw = fighterImgRef.current.width;
    const fh = fighterImgRef.current.height;

    let hitExplosion: Explosion | null = null;

    if (
      (fighter.current.x > asteroid.current.x &&
        fighter.current.x < asteroid.current.x + aw &&
        fighter.current.y > asteroid.current.y &&
        fighter.current.y < asteroid.current.y + ah) ||
      (fighter.current.x + fw > asteroid.current.x &&
        fighter.current.x + fw < asteroid.current.x + aw &&
        fighter.current.y > asteroid.current.y &&
        fighter.current.y < asteroid.current.y + ah) ||
      (fighter.current.x > asteroid.current.x &&
        fighter.current.x < asteroid.current.x + aw &&
        fighter.current.y + fh > asteroid.current.y &&
        fighter.current.y + fh < asteroid.current.y + ah) ||
      (fighter.current.x + fw > asteroid.current.x &&
        fighter.current.x + fw < asteroid.current.x + aw &&
        fighter.current.y + fh > asteroid.current.y &&
        fighter.current.y + fh < asteroid.current.y + ah)
    ) {
      hitExplosion = { x: asteroid.current.x, y: asteroid.current.y };
      resetFighter();
      resetAsteroid();

      setLives((prevLives) => {
        if (prevLives <= 0) {
          return 0;
        }

        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setIsGameOver(true);
          console.log("over");
          return 0;
        }

        return newLives;
      });
    }

    lasers.current.forEach((laser, i) => {
      if (
        laser.x > asteroid.current.x &&
        laser.x < asteroid.current.x + aw &&
        laser.y > asteroid.current.y &&
        laser.y < asteroid.current.y + ah
      ) {
        hitExplosion = { x: laser.x, y: laser.y };
        lasers.current.splice(i, 1);
        resetAsteroid();
        setScore((prevScore) => prevScore + 100);
      }
    });

    return hitExplosion;
  };

  function shuffle(arr: string | any[]) {
    var random = Math.floor(Math.random() * arr.length);
    return arr[random];
  }

  const resetFighter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log(1);
    fighter.current.x = 0;
    fighter.current.y = canvas.height / 2;
  };

  const resetAsteroid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // const speed = Math.floor(Math.random() * 5) + 5;
    asteroid.current.x = canvas.width;
    asteroid.current.y = Math.floor(Math.random() * 350);

    if (asteroid.current.y < 40) {
      asteroid.current.y = 40;
    }

    if (asteroid.current.y > 360) {
      asteroid.current.y = 360;
    }

    randomScale = shuffle(arrScale);
  };

  const updateGame = () => {
    if (87 in keysDownRef.current) fighter.current.y -= fighter.current.speed; // W
    if (83 in keysDownRef.current) fighter.current.y += fighter.current.speed; // S
    if (65 in keysDownRef.current) fighter.current.x -= fighter.current.speed; // A
    if (68 in keysDownRef.current) fighter.current.x += fighter.current.speed; // D

    fighter.current.x = Math.max(0, Math.min(fighter.current.x, 600 - 60));
    fighter.current.y = Math.max(0, Math.min(fighter.current.y, 400 - 30));

    asteroid.current.x -= 5;
    if (asteroid.current.x < -50) {
      asteroid.current.x = 600;
      asteroid.current.y = Math.random() * 350;
    }

    renderGame();
  };

  const renderGame = () => {
    const ctx = ctxRef.current;
    if (!ctx || !bgImgRef.current) return;

    ctx.clearRect(0, 0, 600, 400);

    ctx.drawImage(bgImgRef.current, 0, 0, 600, 400);

    if (fighterImgRef.current) {
      ctx.drawImage(
        fighterImgRef.current,
        fighter.current.x,
        fighter.current.y
      );
    }

    if (asteroidImgRef.current) {
      ctx.drawImage(
        asteroidImgRef.current,
        asteroid.current.x,
        asteroid.current.y,
        50,
        50
      );
    }

    lasers.current.forEach((laser) => {
      if (laserImgRef.current) {
        ctx.drawImage(laserImgRef.current, laser.x, laser.y);
      }
    });
  };

  const drawLaser = () => {
    const ctx = ctxRef.current;
    if (!ctx || !laserImgRef.current) return;

    if (lasers.current.length) {
      for (let i = 0; i < lasers.current.length; i++) {
        ctx.drawImage(
          laserImgRef.current,
          lasers.current[i].x,
          lasers.current[i].y
        );
      }
    }
  };

  const moveLaser = () => {
    for (let i = 0; i < lasers.current.length; i++) {
      if (lasers.current[i].x > 0) {
        lasers.current[i].x += 20;
      }

      if (lasers.current[i].x > 600) {
        lasers.current.splice(i, 1);
      }
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      updateGame();
      drawLaser();
      moveLaser();
      detectCollision();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isGameOver, updateGame]);

  useEffect(() => {
    fetchImage();

    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");

    const handleKeyDown = (e: KeyboardEvent) => {
      keysDownRef.current[e.keyCode] = true;
      if (e.code === "Space" && !isGameOver) {
        lasers.current.push({
          x: fighter.current.x + FIGHTER_WIDTH,
          y: fighter.current.y + FIGHTER_HEIGHT / 2 - 5,
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      delete keysDownRef.current[e.keyCode];
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver]);

  const handleRestart = () => {
    setIsGameOver(false);
    setLives(2);
    setScore(0);
    fighter.current = { x: 50, y: 200, speed: 5 };
    asteroid.current = { x: 600, y: Math.random() * 350 };
  };

  return (
    <>
      <canvas ref={canvasRef} width={600} height={400}></canvas>
      <div className="lives">LIVE: {lives}</div>
      <div className="score">SCORE: {score}</div>
      {isGameOver && (
        <div className="game-over">
          GAME OVER
          <p>
            <span onClick={handleRestart}>[Restart]</span>
          </p>
        </div>
      )}
    </>
  );
};

export default ShootingGame;
