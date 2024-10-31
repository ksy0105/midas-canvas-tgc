import { useRef, useEffect } from "react";
import { loadImage } from "../utils";

const Dottodot = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const finishImgRef = useRef<HTMLImageElement | null>(null);

  const fetchImage = async () => {
    try {
      const bgImg = await loadImage("dottodot_airplane.png");
      const finishImg = await loadImage("dottodot_airplane_finish.png");

      bgImgRef.current = bgImg;
      finishImgRef.current = finishImg;
    } catch (error) {
      console.error("이미지 로드 실패:", error);
    }
  };

  const drawBgImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!bgImgRef.current) return;
    ctx?.drawImage(bgImgRef.current, 0, 0);
  };

  const drawFinishImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!finishImgRef.current) return;
    ctx?.drawImage(finishImgRef.current, 0, 0);
  };

  useEffect(() => {
    fetchImage().then(() => drawBgImage());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let startX = 0;
    let startY = 0;
    const arrCoords = [];
    const TOTAL_POINT = 32;

    const handleClick = (event: MouseEvent) => {
      if (arrCoords.length >= TOTAL_POINT) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = Math.round(event.clientY - rect.top);
      const radius = 8;

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

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, radius, 0, 6.28);
      ctx.fillStyle = "#abf400";
      ctx.fill();
      ctx.strokeStyle = "#005842";
      ctx.stroke();

      const DOT_COUNT: number = arrCoords.length + 1;
      ctx.font = "normal bold 8px Arial, sans-serif";
      ctx.fillStyle = "#3b0058";
      ctx.fillText(DOT_COUNT.toString(), mouseX - 3, mouseY + 4);

      arrCoords.push(mouseX + "," + mouseY);

      if (arrCoords.length === TOTAL_POINT) {
        alert("굿");
        drawFinishImage();
      }
    };
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={600} height={400}></canvas>
    </>
  );
};

export default Dottodot;
