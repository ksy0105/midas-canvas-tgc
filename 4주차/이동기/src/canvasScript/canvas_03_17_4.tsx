import React, { useEffect, useRef, useState } from "react";

interface EnemyType {
  id: string;
  x: number;
  y: number;
}

const EnemyPlane: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enemies, setEnemies] = useState<EnemyType[]>([
    { id: "enemy1", x: 100, y: 10 }, // 적기 초기 위치
    { id: "enemy2", x: 200, y: 10 },
    { id: "enemy3", x: 300, y: 10 },
  ]);

  const enemyImage = new Image();
  enemyImage.src = "/public/EnemyFighter.png"; // 적기 이미지 경로 설정

  // 적기를 그리는 함수
  const renderEnemies = (ctx: CanvasRenderingContext2D) => {
    enemies.forEach((enemy) => {
      ctx.strokeStyle = "red";
      ctx.strokeRect(enemy.x, enemy.y, 43, 61); // 적기의 크기
      ctx.drawImage(enemyImage, enemy.x, enemy.y, 43, 61); // 적기 이미지 그리기
    });
  };

  // 애니메이션 실행 및 적기 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 매 프레임마다 초기화
      renderEnemies(ctx); // 적기 렌더링
    };

    const interval = setInterval(animate, 30); // 30ms마다 애니메이션 실행

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, [enemies]); // 적기 상태 변경 시 리렌더링

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

export default EnemyPlane;