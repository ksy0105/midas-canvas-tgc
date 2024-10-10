import { useEffect, useRef } from "react";

const ShootingDownEnemy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysDownRef = useRef<{ [key: string]: boolean }>({});
  const missilesRef = useRef<
    {
      x: number;
      y: number;
      w: number;
      h: number;
      bg: string;
    }[]
  >([]);

  const enemies = [
    { id: "enemy1", x: 100, y: -70, w: 43, h: 61 },
    { id: "enemy2", x: 200, y: -70, w: 43, h: 61 },
    { id: "enemy3", x: 300, y: -70, w: 43, h: 61 },
  ];

  const enemySpeed = 0.5;
  const speed = 5;
  const player = useRef({ x: 200, y: 250, w: 50, h: 45 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    const fighterImage = new Image();
    fighterImage.src = "BlueFighter.png";
    const enemyImage = new Image();
    enemyImage.src = "EnemyFighter.png";

    const renderEnemies = () => {
      if (enemies.length === 0) {
        gameOver(ctx);
        return;
      }

      for (var i = 0; i < enemies.length; i++) {
        var enemyY = (enemies[i].y += enemySpeed);
        ctx.drawImage(enemyImage, enemies[i].x, enemyY);
      }
    };

    const renderPlayer = () => {
      ctx.drawImage(fighterImage, player.current.x, player.current.y);

      for (let i = 0; i < missilesRef.current.length; i++) {
        const m = missilesRef.current[i];
        ctx.fillStyle = m.bg;
        m.y -= 5;
        ctx.fillRect(m.x, m.y, m.w, m.h);
        checkCollision(m, i);

        if (m.y <= 0) {
          missilesRef.current.splice(i, 1);
        }
      }
    };

    const checkCollision = (m: (typeof missilesRef.current)[0], mi: number) => {
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (m.x >= e.x && m.x <= e.x + e.w && m.y >= e.y && m.y <= e.y + e.h) {
          missilesRef.current.splice(mi, 1);
          enemies.splice(i, 1);
          break;
        }
      }
    };

    let animation: number;
    const gameOver = (ctx: CanvasRenderingContext2D) => {
      cancelAnimationFrame(animation);
      ctx.font = "bold 36px Arial, sans-serif";
      ctx.fillStyle = "#FC0";
      ctx.textAlign = "center";
      ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
    };

    const update = () => {
      if (keysDownRef.current["a"]) {
        player.current.x -= speed;
      } else if (keysDownRef.current["d"]) {
        player.current.x += speed;
      }

      if (player.current.x < 0) {
        player.current.x = 0;
      } else if (player.current.x > canvas.width - player.current.w) {
        player.current.x = canvas.width - player.current.w;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderEnemies();
      renderPlayer();
      update();
      animation = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysDownRef.current[e.key] = true;

      if (e.key === " ") {
        missilesRef.current.push({
          x: player.current.x + player.current.w * 0.5,
          y: player.current.y - 5,
          w: 3,
          h: 10,
          bg: "red",
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      delete keysDownRef.current[e.key];
    };

    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      handleKeyDown(e);
    });
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      handleKeyUp(e);
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <h2>3_17_1~7. 미사일과 적기의 충돌 처리하기</h2>
      <canvas ref={canvasRef} />
    </>
  );
};

export default ShootingDownEnemy;
