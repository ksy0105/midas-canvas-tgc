// src/components/CanvasSnow.tsx
import React, { useEffect, useRef } from "react";
import CanvasComponent from "../CanvasComponent";
import IU from "../../assets/images/iu.png";

const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {
  const ctxW = 400 + 100;
  const ctxH = 300 + 100;
  const snowflakes: Array<{ x: number; y: number; size: number }> = [];
  const bgImage = new Image();
  bgImage.src = IU;

  // 눈송이를 추가하는 함수
  const addSnowflake = () => {
    const x = Math.floor(Math.random() * ctxW) - 100;
    const y = 0;
    const size = Math.floor(Math.random() * 3) + 1;
    snowflakes.push({ x, y, size });
  };

  // 눈송이를 그리는 함수
  const snow = () => {
    addSnowflake();
    ctx.fillStyle = "rgba(255,255,255,0.75)";

    for (let i = 0; i < snowflakes.length; i++) {
      const snowflake = snowflakes[i];
      const ty = (snowflake.y += snowflake.size * 0.5);
      ctx.beginPath();
      ctx.arc(snowflake.x, ty, snowflake.size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // 눈송이가 화면을 넘어가면 삭제
      if (snowflake.y > ctxH) {
        snowflakes.splice(i, 1);
      }
    }
  };

  // 눈송이 개수를 화면에 표시
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
  };

  bgImage.onload = () => {
    const render = () => {
      animate();
      requestAnimationFrame(render);
    };
    render();
  };
};

const CanvasSnow: React.FC = () => {
  return (
    <div style={{ margin: "10px", background: "#D0D0D0" }}>
      <CanvasComponent draw={drawCanvas1} />
    </div>
  );
};

export default CanvasSnow;
