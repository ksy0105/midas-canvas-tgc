// src/components/Canvas3.tsx
import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas2 = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.stroke();
};

const Canvas3_1: React.FC = () => {
  return <CanvasComponent draw={drawCanvas2} />;
};

export default Canvas3_1;
