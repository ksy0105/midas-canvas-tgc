import { Hole, Mole } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';

export const generateHolePositions = (): Hole[] => {
  const holes: Hole[] = [];
  const rowSpacing = GAME_CONFIG.CANVAS_HEIGHT / 4;
  
  GAME_CONFIG.HOLE_LAYOUT.forEach((holesInRow, rowIndex) => {
    const spacing = GAME_CONFIG.CANVAS_WIDTH / (holesInRow + 1);
    for (let i = 0; i < holesInRow; i++) {
      holes.push({
        x: spacing * (i + 1),
        y: rowSpacing * (rowIndex + 1),
        row: rowIndex,
        index: i,
      });
    }
  });
  
  return holes;
};

export const getRandomDuration = (): number => {
  return Math.random() * 
    (GAME_CONFIG.MOLE_MAX_DURATION - GAME_CONFIG.MOLE_MIN_DURATION) + 
    GAME_CONFIG.MOLE_MIN_DURATION;
};

export const createMole = (hole: Hole): Mole => ({
  id: Math.random().toString(36).substr(2, 9),
  hole,
  isBomb: Math.random() < GAME_CONFIG.BOMB_PROBABILITY,
  duration: getRandomDuration(),
  startTime: Date.now(),
});

export const getRandomDelay = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));