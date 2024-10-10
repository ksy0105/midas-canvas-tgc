import React, { useEffect, useRef, useState } from "react";

interface Missile {
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
}

const MissilePlane: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 200 - 25, y: 250 });
  const [missiles, setMissiles] = useState<Missile[]>([]); // 미사일 상태 관리
  const speed = 5;
  const fighterImage = new Image();
  fighterImage.src = "/public/BlueFighter.png";
  const keysDown: { [key: string]: boolean } = {};

  // 키보드 이벤트 처리 (keyCode 대신 key와 code 사용)
  const handleKeyDown = (event: KeyboardEvent) => {
    keysDown[event.key] = true;

    // 스페이스바 누를 때 미사일 추가 (event.code 사용하여 스페이스바 구분)
    if (event.code === "Space") {
      setMissiles((prevMissiles) => [
        ...prevMissiles,
        { x: playerPos.x + 25, y: playerPos.y - 5, w: 3, h: 10, bg: "red" },
      ]);
    }
  };

  // 키보드에서 손을 뗄 때 (key 사용)
  const handleKeyUp = (event: KeyboardEvent) => {
    delete keysDown[event.key];
  };

  // 플레이어 위치 업데이트
  const updatePosition = () => {
    setPlayerPos((prevPos) => {
      let newX = prevPos.x;
      let newY = prevPos.y;

      if (keysDown["a"] || keysDown["A"]) {
        newX -= speed; // A 키일 때 왼쪽으로 이동
      } else if (keysDown["d"] || keysDown["D"]) {
        newX += speed; // D 키일 때 오른쪽으로 이동
      }

      // 캔버스 경계 내에서만 이동 가능
      if (newX < 0) newX = 0;
      if (newX > 400 - 50) newX = 400 - 50;

      return { x: newX, y: newY };
    });
  };

  // 미사일 위치 업데이트
  const updateMissiles = () => {
    setMissiles((prevMissiles) =>
      prevMissiles
        .map((missile) => ({ ...missile, y: missile.y - 5 })) // 미사일을 위로 이동
        .filter((missile) => missile.y > 0) // 화면 밖으로 나간 미사일 제거
    );
  };

  const Player = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "red";
    ctx.strokeRect(playerPos.x, playerPos.y, 50, 45);
    ctx.drawImage(fighterImage, playerPos.x, playerPos.y, 50, 45);

    // 미사일 렌더링
    missiles.forEach((missile) => {
      ctx.fillStyle = missile.bg;
      ctx.fillRect(missile.x, missile.y, missile.w, missile.h);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePosition();
      updateMissiles();
      Player(ctx);
    };

    // 미사일과 플레이어 위치 업데이트
    const interval = setInterval(animate, 30);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playerPos, missiles]); // 플레이어 위치와 미사일 상태가 변경될 때마다 리렌더링

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

export default MissilePlane;