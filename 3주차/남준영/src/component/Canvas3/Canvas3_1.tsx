// src/components/Canvas3.tsx
import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.stroke();
};

const Canvas3_1: React.FC = () => {
  return <CanvasComponent draw={drawCanvas1} />;
};

export default Canvas3_1;
