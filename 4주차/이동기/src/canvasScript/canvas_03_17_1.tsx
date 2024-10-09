import { useEffect, useRef } from "react";

const HorizontalPlane = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speed = 5;
  const fighterImage = new Image();
  fighterImage.src = "/public/BlueFighter.png"; // 이미지 경로를 React 프로젝트 내에서 적절하게 지정

  interface PlayerProps {
    x: number;
    y: number;
    w: number;
    h: number;
    render: () => void;
  }

  const Player = (ctx: CanvasRenderingContext2D): PlayerProps => {
    const player = {
      x: 200 - 25,
      y: 250,
      w: 50,
      h: 45,
      render() {
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(fighterImage, this.x, this.y);
      },
    };

    return player;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canW = canvas.width;
    const canH = canvas.height;
    const player = Player(ctx);

    const animate = () => {
      ctx.clearRect(0, 0, canW, canH);
      player.render();
    };

    const interval = setInterval(animate, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="myCanvas"
      width={400}
      height={300}
      style={{
        background: "#FFF",
        border: "1px solid #909090",
      }}
    >
      CANVAS를 지원하지 않습니다.
    </canvas>
  );
};

export default HorizontalPlane;