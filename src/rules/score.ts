import { Score, ScoreInput } from "@/types/score";

export function getMatrixSizeScore(matrixSize: number): number {
  if (matrixSize > 90) {
    return 2 * matrixSize;
  }

  if (matrixSize > 70) {
    return 20 * matrixSize;
  }

  if (matrixSize > 50) {
    return 5 * matrixSize;
  }

  if (matrixSize > 25) {
    return 2 * matrixSize;
  }

  return 0;
}

export function getAliveCellsScore(aliveCells: number): number {
  if (aliveCells > 20) {
    return 10 * aliveCells;
  }

  if (aliveCells > 0) {
    return 5 * aliveCells;
  }

  return 0;
}

export function getCellsStockScore(cellsStock: number): number {
  if (cellsStock > 3) {
    return 3 * cellsStock;
  }

  return 0;
}

export function getScore({
  matrixSize,
  aliveCells,
  cellsStock,
}: ScoreInput): Score {
  const matrixSizeScore = getMatrixSizeScore(matrixSize);
  const aliveCellsScore = getAliveCellsScore(aliveCells);
  const cellsStockScore = getCellsStockScore(cellsStock);

  const globalScore = matrixSizeScore + aliveCellsScore + cellsStockScore;

  return {
    global: globalScore,
    details: {
      matrixSize: matrixSizeScore,
      aliveCells: aliveCellsScore,
      cellsStock: cellsStockScore,
    },
  };
}
