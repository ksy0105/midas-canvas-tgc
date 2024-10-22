import React, { useEffect, useRef, useState } from "react";

interface Laser {
  x: number;
  y: number;
}

interface Asteroid {
  x: number;
  y: number;
}

interface HighScore {
  name: string;
  score: number;
}

const SpaceShooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysDown = useRef<Record<string, boolean>>({});
  const lasers = useRef<Laser[]>([]);
  const asteroids = useRef<Asteroid[]>([]);
  const fighter = useRef({ x: 50, y: 200, speed: 5 });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [isGameOver, setIsGameOver] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [playerName, setPlayerName] = useState("");
  const laserTotal = 10;

  const background = useRef(new Image());
  const fighterImage = useRef(new Image());
  const laserImage = useRef(new Image());
  const asteroidImage = useRef(new Image());
  const explodeImage = useRef(new Image());

  const ImgBack = "/images/space.png";
  const fighterImageSrc = "/images/fighter.png";
  const laserImageSrc = "/images/laser.png";
  const asteroidImageSrc = "/images/asteroid.png";
  const explodeImageSrc = "/images/explode.png";

  const fighterWidth = 60;
  const fighterHeight = 30;
  const asteroidWidth = 50;
  const asteroidHeight = 50;

  const onImagesLoad = () => {
    setImagesLoaded(true);
  };

  useEffect(() => {
    const loadImages = () => {
      let loadedCount = 0;
      const totalImages = 5;

      const imageLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          onImagesLoad();
        }
      };

      background.current.src = ImgBack;
      background.current.onload = imageLoaded;

      fighterImage.current.src = fighterImageSrc;
      fighterImage.current.onload = imageLoaded;

      laserImage.current.src = laserImageSrc;
      laserImage.current.onload = imageLoaded;

      asteroidImage.current.src = asteroidImageSrc;
      asteroidImage.current.onload = imageLoaded;

      explodeImage.current.src = explodeImageSrc;
      explodeImage.current.onload = imageLoaded;
    };

    loadImages();
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    keysDown.current[e.code] = true;
    if (
      e.code === "Space" &&
      lasers.current.length < laserTotal &&
      !isGameOver
    ) {
      lasers.current.push({
        x: fighter.current.x + fighterWidth,
        y: fighter.current.y + fighterHeight / 2 - 5,
      });
      playLaserSound();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    delete keysDown.current[e.code];
  };

  const playLaserSound = () => {
    try {
      const laserSound = new Audio("/sounds/Laser.wav");
      laserSound.volume = 0.12;
      laserSound.play();
    } catch (error) {
      console.error("Failed to load laser sound:", error);
    }
  };

  const updateGame = () => {
    if (isGameOver) return;

    if (keysDown.current["KeyW"]) {
      fighter.current.y -= fighter.current.speed;
    }
    if (keysDown.current["KeyS"]) {
      fighter.current.y += fighter.current.speed;
    }
    if (keysDown.current["KeyA"]) {
      fighter.current.x -= fighter.current.speed;
    }
    if (keysDown.current["KeyD"]) {
      fighter.current.x += fighter.current.speed;
    }

    fighter.current.x = Math.max(
      0,
      Math.min(600 - fighterWidth, fighter.current.x)
    );
    fighter.current.y = Math.max(
      0,
      Math.min(400 - fighterHeight, fighter.current.y)
    );

    lasers.current = lasers.current
      .map((laser) => ({ ...laser, x: laser.x + 10 }))
      .filter((laser) => laser.x <= 600);

    asteroids.current = asteroids.current
      .map((asteroid) => ({ ...asteroid, x: asteroid.x - 2 }))
      .filter((asteroid) => asteroid.x + asteroidWidth >= 0);

    detectCollisions();
  };

  const detectCollisions = () => {
    lasers.current = lasers.current.filter((laser) => {
      let laserHit = false;
      asteroids.current = asteroids.current.filter((asteroid) => {
        if (
          isColliding(
            laser.x,
            laser.y,
            10,
            5,
            asteroid.x,
            asteroid.y,
            asteroidWidth,
            asteroidHeight
          )
        ) {
          laserHit = true;
          setScore((prevScore) => prevScore + 1);
          return false;
        }
        return true;
      });
      return !laserHit;
    });

    asteroids.current = asteroids.current.filter((asteroid) => {
      const collided = isColliding(
        fighter.current.x,
        fighter.current.y,
        fighterWidth,
        fighterHeight,
        asteroid.x,
        asteroid.y,
        asteroidWidth,
        asteroidHeight
      );

      if (collided) {
        setLives((prevLives) => {
          const newLives = prevLives - 1;
          if (newLives <= 0) {
            setIsGameOver(true);

            loadHighScores();
          }
          return newLives;
        });
        return false;
      }
      return true;
    });
  };

  const isColliding = (
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number
  ) => {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  };

  const renderGame = () => {
    const canvas = canvasRef.current;
    if (canvas && imagesLoaded) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(background.current, 0, 0, 600, 400);

        ctx.drawImage(
          fighterImage.current,
          fighter.current.x,
          fighter.current.y,
          fighterWidth,
          fighterHeight
        );

        lasers.current.forEach((laser) => {
          ctx.drawImage(laserImage.current, laser.x, laser.y, 10, 5);
        });

        asteroids.current.forEach((asteroid) => {
          ctx.drawImage(
            asteroidImage.current,
            asteroid.x,
            asteroid.y,
            asteroidWidth,
            asteroidHeight
          );
        });
      }
    }
  };

  const gameLoop = () => {
    updateGame();
    renderGame();
    if (!isGameOver) {
      requestAnimationFrame(gameLoop);
    }
  };

  useEffect(() => {
    if (imagesLoaded) {
      gameLoop();

      const asteroidInterval = setInterval(() => {
        if (!isGameOver) {
          asteroids.current.push({
            x: 600,
            y: Math.random() * (400 - asteroidHeight),
          });
        }
      }, 1000);

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        clearInterval(asteroidInterval);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [imagesLoaded, isGameOver]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      const newScore: HighScore = { name: playerName, score: score };
      const updatedHighScores = [...highScores, newScore];
      updatedHighScores.sort((a, b) => b.score - a.score);
      setHighScores(updatedHighScores);
      saveHighScores(updatedHighScores);
      setPlayerName("");
    }
  };

  const loadHighScores = () => {
    const storedScores = localStorage.getItem("spaceShooterHighScores");
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  };

  const saveHighScores = (scores: HighScore[]) => {
    localStorage.setItem("spaceShooterHighScores", JSON.stringify(scores));
  };

  useEffect(() => {
    loadHighScores();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{
          background: "#FFF",
          border: "1px solid #909090",
          display: "block",
          margin: "0 auto",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 20,
          color: "yellow",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        SCORE: <span>{score}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 150,
          color: "red",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        LIVES: <span>{lives}</span>
      </div>
      {isGameOver && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 170,
            color: "#FF7F00",
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          GAME OVER
          <form onSubmit={handleNameSubmit} style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{ fontSize: "20px", padding: "5px" }}
            />
            <button type="submit" style={{ fontSize: "20px", padding: "5px" }}>
              Submit
            </button>
          </form>
          <p>
            <span
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => window.location.reload()}
            >
              [Restart]
            </span>
          </p>
        </div>
      )}
      <div
        style={{
          position: "relative",
          top: 10,
          right: 20,
          color: "white",
          fontSize: "16px",
          textAlign: "left",
        }}
      >
        <h3>High Scores</h3>
        <ol>
          {highScores.map((hs, index) => (
            <li key={index}>
              {hs.name}: {hs.score}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SpaceShooter;
