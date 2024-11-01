import React from "react";
import CanvasComponent from "../CanvasComponent";

const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {
  const canvas = ctx.canvas;
  const totalPoint = 31;
  const arrCoords: string[] = [];
  let startX = 0;
  let startY = 0;

  const img = new Image();
  img.src = "images/dottodot_airplane.png";
  img.onload = () => {
    ctx.drawImage(img, 0, 0); // Draw the initial image once it has loaded
  };

  const finishImage = new Image();
  finishImage.src = "images/dottodot_airplane_finish.png";

  // Click event handler
  const handleClick = (event: MouseEvent) => {
    if (arrCoords.length >= totalPoint) return; // Stop if max points reached

    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;
    const radius = 8;

    // Draw line
    if (arrCoords.length === 0) {
      startX = mouseX - 5;
      startY = mouseY;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    } else {
      ctx.moveTo(startX, startY);
      startX = mouseX - 5;
      startY = mouseY;
      ctx.lineTo(startX, startY);
    }
    ctx.stroke();

    // Draw circle
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();

    // Draw text
    const coordcnt = arrCoords.length + 1;
    ctx.font = "normal bold 8px Arial, sans-serif";
    ctx.fillStyle = "#000000";
    ctx.fillText(coordcnt.toString(), mouseX - 3, mouseY + 4);

    // Save coordinates
    arrCoords.push(`${mouseX},${mouseY}`);

    // Show final image if all points are connected
    if (arrCoords.length === totalPoint) {
      alert("잘 하셨습니다.");
      finishImage.onload = () => {
        ctx.drawImage(finishImage, 0, 0); // Draw completed image after it has loaded
      };
    }
  };

  // Register event listener
  canvas.addEventListener("click", handleClick);

  // Cleanup function to remove event listener
  return () => {
    canvas.removeEventListener("click", handleClick);
  };
};

const Canvas7: React.FC = () => {
  return <CanvasComponent draw={drawCanvas1} />;
};

export default Canvas7;
