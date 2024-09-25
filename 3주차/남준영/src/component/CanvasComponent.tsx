// src/components/CanvasComponent.tsx
import React, { useRef, useEffect } from "react";

interface CanvasComponentProps {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    draw(ctx);
  }, [draw]);

  return (
    <canvas
      width={400}
      height={300}
      ref={canvasRef}
      style={{ background: "#FFF", border: "1px solid #909090" }}
    >
      CANVAS를 지원하지 않습니다.
    </canvas>
  );
};

export default CanvasComponent;
