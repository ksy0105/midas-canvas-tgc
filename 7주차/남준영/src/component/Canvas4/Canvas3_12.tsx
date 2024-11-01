import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {
  const canvas = ctx.canvas;

  // 클릭 이벤트 추가
  const handleClick = (event: MouseEvent) => {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;
    ctx.fillStyle = "red";
    // 마우스 클릭한 곳에서 사각형의 중심이 되어서 생성이 된다.
    ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20);
  };

  // 이벤트 리스너 등록
  canvas.addEventListener("click", handleClick);

  // cleanup 함수에서 이벤트 리스너 제거
  return () => {
    canvas.removeEventListener("click", handleClick);
  };
};

const Canvas3_12: React.FC = () => {
  return <CanvasComponent draw={drawCanvas1} />;
};

export default Canvas3_12;
