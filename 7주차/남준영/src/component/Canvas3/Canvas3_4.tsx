// src/components/Canvas3.tsx
import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
};

const Canvas3_4: React.FC = () => {
  return <CanvasComponent draw={drawCanvas} />;
};

export default Canvas3_4;
