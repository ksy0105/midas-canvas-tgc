export interface Hole {
  x: number;
  y: number;
  row: number;
  index: number;
}

export interface Mole {
  id: string;
  hole: Hole;
  isBomb: boolean;
  duration: number;
  startTime: number;
}

export interface Score {
  name: string;
  score: number;
  date: string;
}