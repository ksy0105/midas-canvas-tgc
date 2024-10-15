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

    const ctxW = canvas.width + 100;
    const ctxH = canvas.height + 100;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";
    bgImageRef.current = bgImage;

    const snowflakes: Snowflake[] = [];
    // const TOTAL_COUNT = 10;

    const addSnowFlake = () => {
      // if (snowflakes.length >= TOTAL_COUNT) return;

      const x = Math.floor(Math.random() * ctxW) - 100;
      const y = 0;
      const size = Math.floor(Math.random() * 2) + 1;
      // const x = Math.floor(Math.random() * ctxW) + 1;

      snowflakes.push({ x: x, y: y, size: size });
    };

    const snow = () => {
      addSnowFlake();

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

      snowflakes.forEach((snowflake, index) => {
        ctx.beginPath();
        let ty = (snowflake.y += snowflake.size * 0.5);
        ctx.arc(
          snowflake.x,
          // snowflakes[i].y++,
          ty,
          snowflake.size,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (snowflake.y > ctxH) {
          snowflakes.splice(index, 1);
        }
      });
    };

    const displayCount = () => {
      ctx.fillStyle = "white";
      ctx.font = "bold 14px Arial, sans-serif";
      ctx.fillText(snowflakes.length.toString(), 10, 20);
    };

    const animate = () => {
      ctx.save();
      ctx.clearRect(0, 0, ctxW, ctxH);
      ctx.drawImage(bgImage, 0, 0);
      displayCount();
      ctx.rotate(-0.2);
      snow();
      ctx.restore();
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <h2>3_18. 파티클 만들기</h2>
      <canvas ref={canvasRef} width={400} height={300} />
    </>
  );
};

export default SnowParticle;
