import React, { useEffect, useRef, useState } from "react";

interface EnemyType {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const MovingEnemyPlane: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enemies, setEnemies] = useState<EnemyType[]>([
    { id: "enemy1", x: 100, y: -70, w: 43, h: 61 }, // 적기 초기 위치와 크기
    { id: "enemy2", x: 200, y: -70, w: 43, h: 61 },
    { id: "enemy3", x: 300, y: -70, w: 43, h: 61 },
  ]);
  const speed = 0.5; // 적기 이동 속도
  const enemyImage = new Image();
  enemyImage.src = "/public/EnemyFighter.png"; // 적기 이미지 경로 설정

  // 적기 렌더링 및 움직임 구현
  const renderEnemies = (ctx: CanvasRenderingContext2D) => {
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        const newY = enemy.y + speed; // 적기의 y 좌표를 속도에 따라 증가시킴
        ctx.strokeStyle = "red";
        ctx.strokeRect(enemy.x, newY, enemy.w, enemy.h); // 적기 외곽선 그리기
        ctx.drawImage(enemyImage, enemy.x, newY, enemy.w, enemy.h); // 적기 이미지 그리기
        return { ...enemy, y: newY }; // 새로운 y 좌표로 적기 상태 업데이트
      })
    );
  };

  // 애니메이션 루프 및 적기 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 매 프레임마다 캔버스를 초기화
      renderEnemies(ctx); // 적기 렌더링 및 움직임 처리
    };

    const interval = setInterval(animate, 30); // 30ms마다 애니메이션 실행

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, [enemies]); // 적기 상태가 변경될 때마다 리렌더링

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

export default MovingEnemyPlane;