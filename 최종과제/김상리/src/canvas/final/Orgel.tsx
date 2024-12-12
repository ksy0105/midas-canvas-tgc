"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
}

interface OrnamentObject {
  x: number;
  y: number;
  jumpOffset: number;
  jumpSpeed: number;
  moveSpeed: number;
  type: "⛄" | "🎄" | "🎁" | "🦌" | "☃️" | "🧦" | "🛷";
}

export default function Orgel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDayTime, setIsDayTime] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [ornaments, setOrnaments] = useState<OrnamentObject[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Initialize ornaments
  useEffect(() => {
    const initialOrnaments: OrnamentObject[] = [
      {
        x: 0,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.007,
        moveSpeed: -0.05,
        type: "⛄",
      },
      {
        x: 250,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.007,
        moveSpeed: -0.07,
        type: "🎄",
      },
      {
        x: 500,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.009,
        moveSpeed: -0.07,
        type: "🎁",
      },
      {
        x: 750,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.007,
        moveSpeed: -0.07,
        type: "🦌",
      },
      {
        x: 1000,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.009,
        moveSpeed: -0.07,
        type: "☃️",
      },
      {
        x: 1250,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.009,
        moveSpeed: -0.07,
        type: "🛷",
      },
      {
        x: 1500,
        y: 400,
        jumpOffset: 0,
        jumpSpeed: 0.008,
        moveSpeed: -0.07,
        type: "🧦",
      },
    ];
    setOrnaments(initialOrnaments);
  }, []);

  // Initialize snowflakes
  useEffect(() => {
    const createSnowflake = (): Snowflake => ({
      x: Math.random() * (canvasRef.current?.width || 600),
      y: Math.random() * -200,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.05,
      speedX: Math.random() * 0.3 - 0.15,
    });

    const initialSnowflakes = Array.from({ length: 40 }, createSnowflake); // Reduced snowflakes
    setSnowflakes(initialSnowflakes);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDayTime) {
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#E0FFFF");
      } else {
        gradient.addColorStop(0, "#000033");
        gradient.addColorStop(1, "#191970");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw orgel base
      ctx.fillStyle = "rgba(139, 69, 19,.6)";
      ctx.fillRect(0, 450, canvas.width, 150);

      // Draw glass dome
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 440, 550, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Update and draw snowflakes
      if (isPlaying) {
        setSnowflakes((prev) =>
          prev.map((flake) => {
            const newY = flake.y + flake.speedY;
            const newX = flake.x + flake.speedX;
            return {
              ...flake,
              y: newY > canvas.height ? Math.random() * -50 : newY,
              x: newX < 0 ? canvas.width : newX > canvas.width ? 0 : newX,
            };
          })
        );
      }

      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      });

      // Draw ornaments
      setOrnaments((prev) =>
        prev.map((ornament) => {
          const newJumpOffset = isPlaying
            ? Math.sin(performance.now() * ornament.jumpSpeed) * 20
            : ornament.jumpOffset;

          const newX = isPlaying ? ornament.x + ornament.moveSpeed : ornament.x;

          return {
            ...ornament,
            jumpOffset: newJumpOffset,
            x: newX < -100 ? canvas.width : newX,
          };
        })
      );

      ornaments.forEach((ornament) => {
        ctx.font = "180px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(
          ornament.type,
          ornament.x,
          ornament.y + ornament.jumpOffset
        );
      });

      const gradientText = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradientText.addColorStop(0, "red");
      gradientText.addColorStop(1, "green");

      ctx.font = "90px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = gradientText;

      ctx.shadowColor = "rgba(255, 215, 0, 0.5)";
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillText("MERRY CHRISTMAS!", canvas.width / 2, 130);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [snowflakes, ornaments, isDayTime, isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleDayNight = () => {
    setIsDayTime(!isDayTime);
  };

  return (
    <div className="wrap">
      <div className="canvas_area">
        <div className="marquee_box pos_top">
          <h1
            className={`marquee ${
              isMusicPlaying ? "marquee-moving" : "marquee-paused"
            }`}
          >
            🎄🎁🎶☃️🕯️🎅🏾🦌🛷❄️🤶🏾🌟⛄🎁🌨️🧦🦌🛷👼🕯️🎄🎁🎶☃️🕯️🎅🏾🦌🛷❄️🤶🏾🌟⛄🎁🌨️🧦🦌🛷👼🕯️
          </h1>
        </div>
        <div className="marquee_box pos_left">
          <h1
            className={`marquee ${
              isMusicPlaying ? "marquee-topbottom" : "marquee-paused"
            }`}
          >
            🎄
            <br />
            🎁
            <br />
            🎶
            <br />
            ☃️
            <br />
            🕯️
            <br />
            🎅🏾
            <br />
            🦌
            <br />
            🛷
            <br />
            ❄️
            <br />
            🤶🏾
            <br />
            🌟
            <br />⛄<br />
            🎁
            <br />
            🌨️
            <br />
            🧦
            <br />
            🦌
            <br />
            🛷
            <br />
            👼
            <br />
            🕯️
            <br />
            🎄
            <br />
            🎁
            <br />
            🎶
            <br />
            ☃️
            <br />
            🕯️
            <br />
            🎅🏾
            <br />
            🦌
            <br />
            🛷
            <br />
            ❄️
            <br />
            🤶🏾
            <br />
            🌟
            <br />⛄<br />
            🎁
            <br />
            🌨️
            <br />
            🧦
            <br />
            🦌
            <br />
            🛷
            <br />
            👼
            <br />
            🕯️
          </h1>
        </div>
        <div className="marquee_box pos_bottom">
          <h1
            className={`marquee ${
              isMusicPlaying ? "marquee-moving" : "marquee-paused"
            }`}
          >
            🎄🎁🎶☃️🕯️🎅🏾🦌🛷❄️🤶🏾🌟⛄🎁🌨️🧦🦌🛷👼🕯️🎄🎁🎶☃️🕯️🎅🏾🦌🛷❄️🤶🏾🌟⛄🎁🌨️🧦🦌🛷👼🕯️
          </h1>
        </div>
        <div className="marquee_box pos_right">
          <h1
            className={`marquee ${
              isMusicPlaying ? "marquee-topbottom" : "marquee-paused"
            }`}
          >
            🎄
            <br />
            🎁
            <br />
            🎶
            <br />
            ☃️
            <br />
            🕯️
            <br />
            🎅🏾
            <br />
            🦌
            <br />
            🛷
            <br />
            ❄️
            <br />
            🤶🏾
            <br />
            🌟
            <br />⛄<br />
            🎁
            <br />
            🌨️
            <br />
            🧦
            <br />
            🦌
            <br />
            🛷
            <br />
            👼
            <br />
            🕯️
            <br />
            🎄
            <br />
            🎁
            <br />
            🎶
            <br />
            ☃️
            <br />
            🕯️
            <br />
            🎅🏾
            <br />
            🦌
            <br />
            🛷
            <br />
            ❄️
            <br />
            🤶🏾
            <br />
            🌟
            <br />⛄<br />
            🎁
            <br />
            🌨️
            <br />
            🧦
            <br />
            🦌
            <br />
            🛷
            <br />
            👼
            <br />
            🕯️
          </h1>
        </div>
        <canvas ref={canvasRef} width={1000} height={600} />
        <div className="group_btn">
          <button onClick={toggleMusic} className="btn_music">
            {isPlaying ? "Pause Music" : "Play Music"}
          </button>
          <button onClick={toggleDayNight} className="btn_bg">
            {isDayTime ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
      <audio ref={audioRef} src="src/sounds/orgel/jinglebell.mp3" loop />
    </div>
  );
}
