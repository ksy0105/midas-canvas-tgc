import React, { useEffect, useRef, useState } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import { CANVAS_SIZE, CELL_SIZE } from "../utils/constants";

const Game = () => {
  const canvasRef = useRef(null);
  const { snake, food, gameOver, score, startGame, isGameStarted } =
    useGameLogic();
  const [name, setName] = useState(""); // 사용자 이름 상태
  const [rankings, setRankings] = useState([]); // 순위 상태
  const [isScoreSaved, setIsScoreSaved] = useState(false); // 점수 저장 여부

  // 순위 데이터를 로드
  useEffect(() => {
    const storedRankings = JSON.parse(localStorage.getItem("rankings")) || [];
    setRankings(storedRankings);
  }, []); // 초기 로드 시 한 번 실행

  useEffect(() => {
    if (!isGameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#FF0000" : "#4CAF50"; // Red head, green body
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      );

      // Draw eyes on the head
      if (index === 0) {
        ctx.fillStyle = "#FFFFFF";
        const eyeSize = 3;
        const eyePadding = 4;

        // Draw eyes
        ctx.fillRect(
          segment.x * CELL_SIZE + eyePadding,
          segment.y * CELL_SIZE + eyePadding,
          eyeSize,
          eyeSize
        );
        ctx.fillRect(
          segment.x * CELL_SIZE + CELL_SIZE - eyePadding - eyeSize,
          segment.y * CELL_SIZE + eyePadding,
          eyeSize,
          eyeSize
        );
      }
    });

    // Draw food
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE - 1,
      CELL_SIZE - 1
    );
  }, [snake, food, isGameStarted]);

  const saveScore = () => {
    if (isScoreSaved) return; // 이미 저장된 경우 중복 저장 방지

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      alert("이름은 2자 이상 입력해야 합니다.");
      return;
    }

    const newRanking = { name: trimmedName, score };
    const updatedRankings = [...rankings, newRanking]
      .sort((a, b) => b.score - a.score) // 점수 기준 내림차순 정렬
      .slice(0, 10); // 상위 10명만 저장

    localStorage.setItem("rankings", JSON.stringify(updatedRankings));
    setRankings(updatedRankings); // 상태 업데이트
    setIsScoreSaved(true); // 저장 완료 상태로 설정
    setName(""); // 이름 초기화
  };

  const handleStartGame = () => {
    setIsScoreSaved(false); // 점수 저장 상태 초기화
    startGame(); // 게임 시작
  };

  return (
    <div className="game-container">
      {!isGameStarted && !gameOver && (
        <div className="menu">
          <h1>Snake Game</h1>
          <button className="start-button" onClick={handleStartGame}>
            게임 시작
          </button>
          <p className="instructions">방향키로 이동하세요</p>
        </div>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>게임 오버!</h2>
          <p>점수: {score}</p>
          {isScoreSaved ? (
            <p>점수가 저장되었습니다!</p>
          ) : (
            <div className="name-input">
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={saveScore}>저장</button>
            </div>
          )}
          <button onClick={handleStartGame}>다시 시작</button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="game-canvas"
      />
      {isGameStarted && !gameOver && <div className="score">점수: {score}</div>}
      <div className="rankings">
        <h3>순위</h3>
        <ul>
          {rankings.map((rank, index) => (
            <li key={index}>
              {index + 1}. {rank.name}: {rank.score}점
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
