import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
}

const SnowParticle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ctxW = canvas.width;
    const ctxH = canvas.height;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";
    bgImageRef.current = bgImage;

    const snowflakes: Snowflake[] = [];
    const TOTAL_COUNT = 10;

    const addSnowFlake = () => {
      if (snowflakes.length >= TOTAL_COUNT) return;

      const size = Math.floor(Math.random() * 3) + 1;
      const x = Math.floor(Math.random() * ctxW) + 1;
      const y = 0;

      snowflakes.push({ x: x, y: y, size: size });
    };

    const snow = () => {
      addSnowFlake();

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

      for (const i in snowflakes) {
        ctx.beginPath();
        ctx.arc(
          snowflakes[i].x,
          snowflakes[i].y++,
          snowflakes[i].size,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (snowflakes[i].y > ctxH) {
          snowflakes.splice(i, 1);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, ctxW, ctxH);
      ctx.drawImage(bgImage, 0, 0, ctxW, ctxH);
      snow();
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <h2>3_18. 파티클 만들기</h2>
      <canvas
        ref={canvasRef}
        style={{
          width: "400px",
          height: "300px",
        }}
      />
    </>
  );
};

export default SnowParticle;
