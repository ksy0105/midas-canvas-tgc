import React, { useEffect, useRef, useState } from "react";

// 적기 정보 타입 정의
interface EnemyType {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// 미사일 정보 타입 정의
interface MissileType {
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
}

const MissileEnemyConflict: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 200 - 25, y: 250 });
  const [missiles, setMissiles] = useState<MissileType[]>([]); // 미사일 상태 관리
  const [enemies, setEnemies] = useState<EnemyType[]>([
    { id: "enemy1", x: 100, y: -70, w: 43, h: 61 }, // 적기 초기 위치
    { id: "enemy2", x: 200, y: -70, w: 43, h: 61 },
    { id: "enemy3", x: 300, y: -70, w: 43, h: 61 },
  ]);
  const speed = 5; // 플레이어 이동 속도
  const enemySpeed = 0.5; // 적기 이동 속도
  const keysDown: { [key: string]: boolean } = {};
  const fighterImage = new Image();
  fighterImage.src = "/public/BlueFighter.png"; // 플레이어 비행기 이미지 경로 설정
  const enemyImage = new Image();
  enemyImage.src = "/public/EnemyFighter.png"; // 적기 이미지 경로 설정

  // 키보드 이벤트 처리 (A, D로 좌우 이동)
  const handleKeyDown = (event: KeyboardEvent) => {
    keysDown[event.key] = true;

    // 스페이스바로 미사일 발사
    if (event.code === "Space") {
      setMissiles((prevMissiles) => [
        ...prevMissiles,
        { x: playerPos.x + 25, y: playerPos.y - 5, w: 3, h: 10, bg: "red" },
      ]);
    }
  };

  // 키보드에서 손을 뗄 때
  const handleKeyUp = (event: KeyboardEvent) => {
    delete keysDown[event.key];
  };

  // 플레이어 위치 업데이트
  const updatePlayerPosition = () => {
    setPlayerPos((prevPos) => {
      let newX = prevPos.x;

      if (keysDown["a"] || keysDown["A"]) {
        newX -= speed; // A 키일 때 왼쪽으로 이동
      } else if (keysDown["d"] || keysDown["D"]) {
        newX += speed; // D 키일 때 오른쪽으로 이동
      }

      // 캔버스 경계 내에서만 이동 가능
      if (newX < 0) newX = 0;
      if (newX > 400 - 50) newX = 400 - 50;

      return { x: newX, y: prevPos.y };
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

  // 충돌 체크 함수
  const checkCollision = (missile: MissileType, missileIndex: number) => {
    setEnemies((prevEnemies) =>
      prevEnemies.filter((enemy, enemyIndex) => {
        const isCollided =
          missile.x >= enemy.x &&
          missile.x <= enemy.x + enemy.w &&
          missile.y >= enemy.y &&
          missile.y <= enemy.y + enemy.h;

        // 충돌 시 적기와 미사일 제거
        if (isCollided) {
          setMissiles((prevMissiles) =>
            prevMissiles.filter((_, index) => index !== missileIndex)
          );
        }
        return !isCollided; // 충돌한 적기를 필터링하여 제거
      })
    );
  };

  // 적기 위치 업데이트 및 렌더링
  const updateEnemies = (ctx: CanvasRenderingContext2D) => {
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        const newY = enemy.y + enemySpeed; // 적기를 아래로 이동
        ctx.strokeStyle = "red";
        ctx.strokeRect(enemy.x, newY, enemy.w, enemy.h); // 적기 외곽선
        ctx.drawImage(enemyImage, enemy.x, newY, enemy.w, enemy.h); // 적기 이미지
        return { ...enemy, y: newY }; // 적기의 새로운 위치를 업데이트
      })
    );
  };

  // 플레이어와 미사일 렌더링
  const renderPlayerAndMissiles = (ctx: CanvasRenderingContext2D) => {
    // 플레이어 비행기 렌더링
    ctx.strokeStyle = "red";
    ctx.strokeRect(playerPos.x, playerPos.y, 50, 45);
    ctx.drawImage(fighterImage, playerPos.x, playerPos.y, 50, 45);

    // 미사일 렌더링
    missiles.forEach((missile, missileIndex) => {
      ctx.fillStyle = missile.bg;
      ctx.fillRect(missile.x, missile.y, missile.w, missile.h);

      // 충돌 체크 실행
      checkCollision(missile, missileIndex);
    });
  };

  // 게임 종료 시 애니메이션 중지
  const checkGameOver = (ctx: CanvasRenderingContext2D) => {
    if (enemies.length === 0) {
      ctx.font = "bold 36px Arial, sans-serif";
      ctx.fillStyle = "#FC0";
      ctx.textAlign = "center";
      ctx.fillText("YOU WIN!", 200, 150); // 화면에 승리 메시지 출력
      return true; // 게임 종료 플래그 반환
    }
    return false;
  };

  // 애니메이션 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 매 프레임 초기화
      updatePlayerPosition(); // 플레이어 위치 업데이트
      updateMissiles(); // 미사일 위치 업데이트
      updateEnemies(ctx); // 적기 이동 및 렌더링
      renderPlayerAndMissiles(ctx); // 플레이어와 미사일 렌더링

      // 적기가 모두 파괴되면 게임 종료
      if (checkGameOver(ctx)) {
        return;
      }
    };

    const interval = setInterval(animate, 30); // 30ms마다 애니메이션 실행

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playerPos, missiles, enemies]); // 상태 변화 시 애니메이션 재실행

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

export default MissileEnemyConflict;