import React from 'react';
import { useGameStore } from '../stores/gameStore';

const Leaderboard: React.FC = () => {
  const { highScores } = useGameStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">랭킹</h2>
      <div className="space-y-2">
        {highScores.map((score, index) => (
          <div
            key={`${score.name}-${score.date}`}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-4">
              <span className="font-bold">{index + 1}.</span>
              <span>{score.name}</span>
            </div>
            <span className="font-mono">{score.score}</span>
          </div>
        ))}
        {highScores.length === 0 && (
          <p className="text-gray-500 text-center">등록된 점수가 없어요!</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
