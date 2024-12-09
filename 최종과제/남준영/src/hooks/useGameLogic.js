import { useState, useEffect, useCallback, useRef } from "react";
import { GRID_SIZE, INITIAL_SNAKE_POSITION } from "../utils/constants";
import { getRandomPosition, checkCollision } from "../utils/gameUtils";

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const useGameLogic = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [speed, setSpeed] = useState(150);

  const directionRef = useRef(direction);
  const lastKeyPressTimeRef = useRef(0);

  const moveSnake = useCallback(() => {
    if (gameOver || !isGameStarted) return;

    let isProcessing = false; // 중복 실행 방지 플래그

    setSnake((prevSnake) => {
      if (isProcessing) return prevSnake; // 이미 실행 중이라면 무시
      isProcessing = true;

      const newSnake = [...prevSnake];
      const head = {
        x: newSnake[0].x + directionRef.current.x,
        y: newSnake[0].y + directionRef.current.y,
      };

      // 벽 충돌 체크
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // 자기 자신과 충돌 체크
      if (checkCollision(head, newSnake.slice(1))) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // 음식 먹었을 때 처리
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1); // 점수 증가
        setFood(getRandomPosition(newSnake)); // 음식 재배치
      } else {
        newSnake.pop(); // 음식 먹지 않으면 꼬리 제거
      }

      isProcessing = false; // 실행 완료 후 플래그 해제
      return newSnake;
    });
  }, [food, gameOver, isGameStarted]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isGameStarted || gameOver) return;

      const now = Date.now();
      if (now - lastKeyPressTimeRef.current < 50) return;
      lastKeyPressTimeRef.current = now;

      const currentDirection = directionRef.current;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (currentDirection !== DIRECTIONS.DOWN) {
            directionRef.current = DIRECTIONS.UP;
            setDirection(DIRECTIONS.UP);
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (currentDirection !== DIRECTIONS.UP) {
            directionRef.current = DIRECTIONS.DOWN;
            setDirection(DIRECTIONS.DOWN);
          }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (currentDirection !== DIRECTIONS.RIGHT) {
            directionRef.current = DIRECTIONS.LEFT;
            setDirection(DIRECTIONS.LEFT);
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (currentDirection !== DIRECTIONS.LEFT) {
            directionRef.current = DIRECTIONS.RIGHT;
            setDirection(DIRECTIONS.RIGHT);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGameStarted, gameOver]);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(gameLoop);
  }, [moveSnake, isGameStarted, gameOver, speed]);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    const speedIncreaseInterval = setInterval(() => {
      setSpeed((prevSpeed) => Math.max(prevSpeed - 10, 100)); // 최소 속도 제한 (100ms)
    }, 5000); // 5초마다 속도 증가

    return () => clearInterval(speedIncreaseInterval);
  }, [isGameStarted, gameOver]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(getRandomPosition(INITIAL_SNAKE_POSITION));
    directionRef.current = DIRECTIONS.RIGHT;
    setDirection(DIRECTIONS.RIGHT);
    setGameOver(false);
    setScore(0);
    setIsGameStarted(true);
  };

  return {
    snake,
    food,
    gameOver,
    score,
    startGame,
    isGameStarted,
  };
};
