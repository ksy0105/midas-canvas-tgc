import { useEffect, useRef, useState } from "react";

const HorizontalPlaneMove = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [playerPos, setPlayerPos] = useState({ x: 200 - 25, y: 250 });
    const speed = 5;
    const fighterImage = new Image();
    fighterImage.src = "/public/BlueFighter.png";
    let keyCodeValue: string = "";
  
    const handleKeyDown = (event: KeyboardEvent) => {
      keyCodeValue = event.key.toUpperCase();
    };
  
    const handleKeyUp = () => {
      keyCodeValue = "";
    };
  
    const updatePosition = () => {
      setPlayerPos((prevPos) => {
        let newX = prevPos.x;
        let newY = prevPos.y;
  
        // W, A, S, D 키에 따라 좌표 업데이트
        if (keyCodeValue === "A") {
          newX -= speed;
        } else if (keyCodeValue === "D") {
          newX += speed;
        } else if (keyCodeValue === "W") {
          newY -= speed;
        } else if (keyCodeValue === "S") {
          newY += speed;
        }
  
        // 캔버스 경계 제한
        if (newX < 0) newX = 0;
        if (newX > 400 - 50) newX = 400 - 50;
        if (newY < 0) newY = 0;
        if (newY > 300 - 45) newY = 300 - 45;
  
        return { x: newX, y: newY };
      });
    };
  
    const Player = (ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = "red";
      ctx.strokeRect(playerPos.x, playerPos.y, 50, 45);
      ctx.drawImage(fighterImage, playerPos.x, playerPos.y, 50, 45);
    };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatePosition();
        Player(ctx);
      };
  
      const interval = setInterval(animate, 30);
  
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
  
      return () => {
        clearInterval(interval);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [playerPos]);
  
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
  
  export default HorizontalPlaneMove;