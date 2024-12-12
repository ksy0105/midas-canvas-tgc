import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Sound } from '@pixi/sound';
import { useGameStore } from '../stores/gameStore';
import { GAME_CONFIG } from '../config/gameConfig';
import { generateHolePositions, createMole, getRandomDelay, sleep } from '../utils/gameUtils';
import { Mole, Hole } from '../types/game';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<PIXI.Application>();
  const molesRef = useRef<Mole[]>([]);
  const graphicsRef = useRef<PIXI.Graphics>();
  const { score, timeLeft, isPlaying, setScore, setTimeLeft, setIsPlaying, setGameOver } = useGameStore();

  const drawHole = (hole: Hole) => {
    if (!graphicsRef.current) return;

    // Draw hole (dark circle)
    graphicsRef.current.beginFill(0x4a3728);
    graphicsRef.current.drawCircle(hole.x, hole.y, 40);
    graphicsRef.current.endFill();

    // Draw hole rim
    graphicsRef.current.lineStyle(4, 0x2d1810);
    graphicsRef.current.drawCircle(hole.x, hole.y, 40);
  };

  const drawMole = (mole: Mole) => {
    if (!graphicsRef.current) return;

    // Draw mole body
    const color = mole.isBomb ? 0x201510 : 0x8b4513;
    graphicsRef.current.beginFill(color);
    graphicsRef.current.drawCircle(mole.hole.x, mole.hole.y - 20, 35);
    graphicsRef.current.endFill();

    if (mole.isBomb) {
      // Draw bomb fuse
      graphicsRef.current.lineStyle(3, 0x000000);
      graphicsRef.current.moveTo(mole.hole.x, mole.hole.y - 55);
      graphicsRef.current.lineTo(mole.hole.x + 10, mole.hole.y - 65);
    } else {
      // Draw mole eyes
      graphicsRef.current.beginFill(0x000000);
      graphicsRef.current.drawCircle(mole.hole.x - 10, mole.hole.y - 25, 5);
      graphicsRef.current.drawCircle(mole.hole.x + 10, mole.hole.y - 25, 5);
      graphicsRef.current.endFill();

      // Draw mole nose
      graphicsRef.current.beginFill(0xff9999);
      graphicsRef.current.drawCircle(mole.hole.x, mole.hole.y - 15, 7);
      graphicsRef.current.endFill();
    }
  };

  const render = () => {
    if (!graphicsRef.current) return;

    graphicsRef.current.clear();

    // Draw grass pattern
    graphicsRef.current.beginFill(0x90EE90);
    for (let x = 0; x < GAME_CONFIG.CANVAS_WIDTH; x += 30) {
      for (let y = 0; y < GAME_CONFIG.CANVAS_HEIGHT; y += 30) {
        graphicsRef.current.drawRect(x, y, 25, 25);
      }
    }
    graphicsRef.current.endFill();

    // Draw all holes
    generateHolePositions().forEach(drawHole);

    // Draw active moles
    molesRef.current.forEach(drawMole);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    gameRef.current = new PIXI.Application({
      width: GAME_CONFIG.CANVAS_WIDTH,
      height: GAME_CONFIG.CANVAS_HEIGHT,
      backgroundColor: 0x7cba3d,
      antialias: true,
    });

    canvasRef.current.appendChild(gameRef.current.view as HTMLCanvasElement);

    graphicsRef.current = new PIXI.Graphics();
    gameRef.current.stage.addChild(graphicsRef.current);

    // Initial render
    render();

    // Animation loop
    gameRef.current.ticker.add(() => {
      render();
    });

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const spawnMoles = async () => {
      const holes = generateHolePositions();
      const availableHoles = holes.filter(
        hole => !molesRef.current.some(mole => mole.hole.x === hole.x && mole.hole.y === hole.y)
      );

      const molesToSpawn = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < molesToSpawn; i++) {
        if (molesRef.current.length < GAME_CONFIG.MAX_ACTIVE_MOLES && availableHoles.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableHoles.length);
          const selectedHole = availableHoles[randomIndex];
          molesRef.current.push(createMole(selectedHole));
          availableHoles.splice(randomIndex, 1);

          // Add small random delay between spawns
          await sleep(getRandomDelay(50, 150));
        }
      }
    };

    const gameLoop = setInterval(async () => {
      if (timeLeft <= 0) {
        clearInterval(gameLoop);
        setIsPlaying(false);
        setGameOver(true);
        return;
      }

      setTimeLeft(timeLeft - 1);

      // Spawn new moles with delays
      await spawnMoles();

      // Remove expired moles with slight delays
      const currentTime = Date.now();
      const expiredMoles = molesRef.current.filter(
        mole => currentTime - mole.startTime >= mole.duration
      );

      for (const mole of expiredMoles) {
        molesRef.current = molesRef.current.filter(m => m.id !== mole.id);
        await sleep(getRandomDelay(50, 150));
      }
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [isPlaying, timeLeft]);

  const handleClick = (event: React.MouseEvent) => {
    if (!isPlaying) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    molesRef.current.forEach(mole => {
      const distance = Math.sqrt(
        Math.pow(x - mole.hole.x, 2) + Math.pow(y - mole.hole.y, 2)
      );

      if (distance < 50) { // Hit radius
        setScore(score + (mole.isBomb ? GAME_CONFIG.BOMB_SCORE : GAME_CONFIG.MOLE_SCORE));
        // TODO: Play sound
        // Sound.play(mole.isBomb ? 'bomb' : 'hit');
        molesRef.current = molesRef.current.filter(m => m.id !== mole.id);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full max-w-[800px] px-4">
        <div className="text-2xl font-bold">점수: {score}</div>
        <div className="text-2xl font-bold">남은 시간: {timeLeft}초</div>
      </div>
      <div
        ref={canvasRef}
        onClick={handleClick}
        className="cursor-pointer rounded-lg overflow-hidden shadow-lg"
      />
    </div>
  );
};

export default Game;
