// src/components/Canvas3.tsx
import React from "react";
import CanvasComponent from "../CanvasComponent";
import IU from "../../assets/images/iu.png";

const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {
  const myPic = new Image();
  myPic.src = IU;
  myPic.onload = function () {
    // 마스크 영역에 그림자 처리
    ctx.shadowColor = "rgba(100,100,100,0.4)";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 5;
    ctx.arc(100, 100, 70, 0, Math.PI * 2, false);
    ctx.fill();

    // 이미지에 마스크 기능을 처리
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 100, 70, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(myPic, 0, 0);
    ctx.restore();
  };
};

const Canvas3_10: React.FC = () => {
  return <CanvasComponent draw={drawCanvas1} />;
};

export default Canvas3_10;
