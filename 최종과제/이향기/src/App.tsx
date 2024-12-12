import React from 'react';
import { useGameStore } from './stores/gameStore';
import Game from './components/Game';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';

function App() {
  const { isPlaying, isGameOver, resetGame, setIsPlaying } = useGameStore();

  const startGame = () => {
    resetGame();
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">두더지 게임</h1>
        
        {!isPlaying && !isGameOver && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-green-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-green-700 transition-colors"
            >
              게임 시작
            </button>
          </div>
        )}

        <Game />
        
        {!isPlaying && !isGameOver && <Leaderboard />}
        {isGameOver && <GameOver />}
      </div>
    </div>
  );
}

export default App;
