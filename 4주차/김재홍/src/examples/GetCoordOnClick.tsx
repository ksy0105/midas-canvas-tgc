import { useEffect, useRef, useState } from "react";

const GetCoordOnClick = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coord, setCoord] = useState({ mouseX: 0, mouseY: 0 });

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    return { canvas, ctx };
  };

  useEffect(() => {
    const { canvas } = getCanvasContext() || {};

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { canvas, ctx } = getCanvasContext() || {};
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setCoord({ mouseX, mouseY });

    ctx.fillStyle = "red";
    ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20);
  };
  return (
    <>
      <h2>3_12_1. 마우스로 클릭한 곳의 좌표 얻기</h2>
      <p>
        X: {coord.mouseX}, Y: {coord.mouseY}
      </p>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{
          border: "1px solid black",
        }}
      />
    </>
  );
};

export default GetCoordOnClick;
