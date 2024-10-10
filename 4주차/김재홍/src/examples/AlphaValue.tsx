import { useEffect, useRef } from "react";

const AlphaValue = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    ctx.fillStyle = "rgba(63, 169, 245, 1)";
    ctx.fillRect(20, 20, 100, 100);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 100);
  });

  return (
    <>
      <h2>3_10_1. 알파값 적용하기</h2>
      <canvas ref={canvasRef} />
    </>
  );
};

export default AlphaValue;
