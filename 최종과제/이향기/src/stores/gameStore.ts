import { create } from 'zustand';
import { Score } from '../types/game';

interface GameState {
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  isGameOver: boolean;
  highScores: Score[];
  setScore: (score: number) => void;
  setTimeLeft: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setGameOver: (gameOver: boolean) => void;
  addHighScore: (score: Score) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  timeLeft: 30,
  isPlaying: false,
  isGameOver: false,
  highScores: [],
  setScore: (score) => set({ score }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setGameOver: (gameOver) => set({ isGameOver: gameOver }),
  addHighScore: (newScore) =>
    set((state) => ({
      highScores: [...state.highScores, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10),
    })),
  resetGame: () => set({
    score: 0,
    timeLeft: 30,
    isPlaying: false,
    isGameOver: false,
  }),
}));