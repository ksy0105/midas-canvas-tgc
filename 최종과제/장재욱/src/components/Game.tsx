import { useEffect, useRef } from "react";
import { useGame } from "../hooks/useGame.ts";
import "./game.css";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../game/constants.ts";

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { startGame, pauseGame, resumeGame, exitGame, gameState, isPaused } =
    useGame(canvasRef);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && gameState === "playing") {
        pauseGame();
        audioRef.current?.pause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, pauseGame]);

  return (
      <div className="game-container">
          <canvas
              ref={canvasRef}
              className="game-canvas"
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
          />

          <div className="controls">
              {gameState === "idle" && (
                  <button className="button" onClick={() => {
                      startGame();
                      audioRef.current?.play();
                  }}>
                      Start Game
                  </button>
              )}
          </div>

          <div className={`pause-menu ${isPaused ? "active" : ""}`}>
              <button className="button" onClick={() => {
                  resumeGame();
                  audioRef.current?.play();
              }}>
                  Resume
              </button>
              <button className="button" onClick={() => {
                  exitGame();
                  if (audioRef.current) {
                      audioRef.current.pause();
                      audioRef.current.currentTime = 0;
                  }
              }}>
                  Exit Game
              </button>
          </div>
          <audio ref={audioRef}>
              <source src={"./src/assets/Unavailable.mp3"} type={"audio/mpeg"}/>
          </audio>
      </div>
  );
}

export default Game;
