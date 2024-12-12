import React, { useState } from 'react';
import { useGameStore } from '../stores/gameStore';

const GameOver: React.FC = () => {
  const [name, setName] = useState('');
  const { score, addHighScore, resetGame } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHighScore({
      name: name.trim(),
      score,
      date: new Date().toISOString(),
    });
    resetGame();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">게임 끝!</h2>
        <p className="text-xl mb-6">최종 점수: {score}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              이름을 입력해 주세요.
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              maxLength={20}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameOver;
