import { useEffect, useRef, useState } from "react";

const MoveRectXAxis = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const [isAnimate, setIsAnimate] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // let x = 0;
    // let y = 0;

    const rectWidth = 50;
    const rectHeight = 50;

    const drawRect = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "red";
      ctx.fillRect(xRef.current, 50, 50, 50);
      ctx.fillStyle = "blue";
      ctx.fillRect(50, yRef.current, 50, 50);
    };

    const animate = () => {
      if (xRef.current + rectWidth < canvasWidth) {
        xRef.current++;
      } else {
        xRef.current = 0;
      }

      if (yRef.current + rectHeight < canvasHeight) {
        yRef.current++;
      } else {
        yRef.current = 0;
      }
      drawRect();
    };

    if (isAnimate) {
      const animateInterval = setInterval(animate, 30);
      return () => clearInterval(animateInterval);
    } else {
      drawRect();
    }
  }, [isAnimate]);

  const handleCanvas = () => {
    setIsAnimate(false);
  };
  return (
    <>
      <h2>3_11_1. 사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기</h2>
      <h2>3_11_2. 두 개의 사각형을 만들고 애니메이션을 멈추게 하기</h2>
      <canvas ref={canvasRef} onClick={handleCanvas} />
    </>
  );
};

export default MoveRectXAxis;
