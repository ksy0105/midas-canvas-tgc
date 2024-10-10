import { useEffect, useRef } from "react";

const JsonObjectArray = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    const buildings = [
      { id: "AirPort", x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0 },
      { id: "Bank", x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0 },
      { id: "CarRepair", x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0 },
      { id: "GasStation", x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0 },
      { id: "Hospital", x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0 },
      { id: "Temple", x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0 },
    ];
    const buildingImage = new Image();
    buildingImage.src = "buildings.png";

    buildingImage.onload = function () {
      for (let i = 0; i < buildings.length; i++) {
        const sx = buildings[i]["sx"];
        const sy = buildings[i]["sy"];
        const sw = buildings[i]["w"];
        const sh = buildings[i]["h"];
        const dx = buildings[i]["x"];
        const dy = buildings[i]["y"];
        const dw = buildings[i]["w"];
        const dh = buildings[i]["h"];

        // s는 source
        // d는 destination
        ctx.drawImage(buildingImage, sx, sy, sw, sh, dx, dy, dw, dh);
      }
    };
  });

  return (
    <>
      <h2>3_15_1. JSON 객체를 배열로 처리하여 사각형을 캔버스에 그리기</h2>
      <h2>3_15_2. JSON 객체를 배열로 처리하여 캔버스에 이미지 그리기</h2>
      <canvas ref={canvasRef} />
    </>
  );
};

export default JsonObjectArray;
