export interface ScoreInput {
  matrixSize: number;
  aliveCells: number;
  cellsStock: number;
}
export interface Score {
  global: number;
  details: {
    matrixSize: number;
    aliveCells: number;
    cellsStock: number;
  };
}
