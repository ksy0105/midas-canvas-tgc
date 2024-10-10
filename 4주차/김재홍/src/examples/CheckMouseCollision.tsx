import { useEffect, useRef } from "react";

const CheckMouseCollision = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const bgImage = new Image();
    bgImage.src = "background.png";

    buildingImage.onload = function () {
      ctx.drawImage(bgImage, 0, 0);
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

    document.addEventListener("mousedown", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      console.log(mouseX, mouseY);

      for (let i = 0; i < buildings.length; i++) {
        const bData = buildings[i];
        if (
          mouseX >= bData.x &&
          mouseX < bData.x + bData.w &&
          mouseY >= bData.y &&
          mouseY < bData.y + bData.h
        ) {
          ctx.clearRect(100, 260, 200, 30);
          ctx.fillStyle = "black";
          ctx.fillRect(100, 260, 200, 30);

          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.font = "bold 20px Arial, sans-serif";
          ctx.fillText(bData.id, 200, 280);
        }
      }
    });
  });

  return (
    <>
      <h2>3_16. 마우스 충돌 체크하기</h2>
      <canvas ref={canvasRef} />
    </>
  );
};

export default CheckMouseCollision;
