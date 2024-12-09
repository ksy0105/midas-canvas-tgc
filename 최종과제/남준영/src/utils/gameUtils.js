import { GRID_SIZE } from "./constants";

export const getRandomPosition = (snake) => {
  while (true) {
    const position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    if (
      !snake.some(
        (segment) => segment.x === position.x && segment.y === position.y
      )
    ) {
      return position;
    }
  }
};

export const checkCollision = (head, snake) => {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
};
