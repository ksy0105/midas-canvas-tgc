import { useEffect, useRef } from "react";

const GlobalCompositeOperation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, 100, 100);
    ctx.globalCompositeOperation = "xor"; // 여집합
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 100);

    const canvas2 = canvas2Ref.current;
    if (!canvas2) return;

    canvas2.width = 400;
    canvas2.height = 300;

    const ctx2 = canvas2.getContext("2d");
    if (!ctx2) return;

    ctx2.fillStyle = "rgba(255, 0, 0, 0.7)";
    ctx2.fillRect(25, 0, 100, 100);
    ctx2.globalCompositeOperation = "lighter";
    ctx2.fillStyle = "rgba(0, 0, 255, 0.7";
    ctx2.fillRect(75, 50, 100, 100);
    ctx2.globalCompositeOperation = "lighter";
    ctx2.fillStyle = "rgba(0, 255, 0, 0.7)";
    ctx2.fillRect(0, 75, 100, 100);
  });

  return (
    <>
      <h2>3_10_2. 두 개의 이미지를 합성하여 그리기</h2>
      <span>여집합(xor)</span>
      <canvas ref={canvasRef} />

      <span>lighter(alpha값을 넣었는데 셀로판지랑 조금 다르다..)</span>
      <canvas ref={canvas2Ref} />
    </>
  );
};

export default GlobalCompositeOperation;
