import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {
  const canvas = ctx.canvas;
  const ctxW = canvas.width;
  const ctxH = canvas.height;
  let x = 0,
    y = 0; // let으로 변경하여 x, y가 변경될 수 있도록 수정

  function animate() {
    ctx.clearRect(0, 0, ctxW, ctxH);
    ctx.fillStyle = "red";
    ctx.fillRect(x, 10, 50, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(10, y, 50, 50);
    x++;
    y++;

    if (x > ctxW) {
      x = 0;
    }

    if (y > ctxH) {
      y = 0;
    }
  }

  const animateInterval = setInterval(animate, 30);

  // jQuery 대신 useEffect와 이벤트 리스너로 대체
  canvas.addEventListener("click", () => {
    clearInterval(animateInterval);
  });

  return () => {
    clearInterval(animateInterval);
    canvas.removeEventListener("click", () => clearInterval(animateInterval));
  };
};

const Canvas3_11: React.FC = () => {
  return <CanvasComponent draw={drawCanvas1} />;
};

export default Canvas3_11;
