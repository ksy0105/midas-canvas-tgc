// src/components/CanvasComponent.tsx
import React, { useRef, useEffect } from "react";

interface CanvasComponentProps {
  draw: (ctx: CanvasRenderingContext2D) => void;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void; // canvas를 부모에게 전달하는 콜백
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  draw,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    draw(ctx);

    // canvas가 준비되면 부모 컴포넌트에 전달
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [draw, onCanvasReady]);

  return (
    <canvas
      width={600}
      height={600}
      ref={canvasRef}
      style={{
        background: "#FFF",
        border: "1px solid #909090",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      CANVAS를 지원하지 않습니다.
    </canvas>
  );
};

export default CanvasComponent;
