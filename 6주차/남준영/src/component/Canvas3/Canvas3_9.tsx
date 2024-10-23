// src/components/Canvas3.tsx
import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 100);
  ctx.setLineDash([20]);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 150);
  ctx.lineTo(300, 150);
  ctx.lineTo(300, 200);
  ctx.setLineDash([20, 10]);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 250);
  ctx.lineTo(300, 250);
  ctx.lineTo(300, 290);
  ctx.setLineDash([20, 10, 50, 10]);
  ctx.stroke();
};

const Canvas3_9: React.FC = () => {
  return <CanvasComponent draw={drawCanvas} />;
};

export default Canvas3_9;
