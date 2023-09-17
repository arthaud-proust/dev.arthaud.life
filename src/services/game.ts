/**
 * Separation of Concerns Principle :
 * Here should only appear code related to game start, run and display.
 */
import { ALIVE, DEAD, Matrix } from "../types/life";

import { getNextStepCellState } from "../rules/life.ts";

const FRAME_INTERVAL = 100;

export function matrixToString(matrix: Matrix): string {
  return matrix
    .map((row) => row.map((cell) => (cell === ALIVE ? "■" : " ")).join("  "))
    .join("\n");
}

export function getNextMatrix(matrix: Matrix): Matrix {
  const extendedMatrix = getExtendedMatrix(matrix);

  return extendedMatrix.map((row, y) =>
    row.map((_cell, x) => getNextStepCellState(matrix, [x, y])),
  );
}

export function getExtendedMatrix(matrix: Matrix): Matrix {
  // extend a matrix side if its border contain an alive ceil

  // top side
  const FIRST_ROW = 0;
  if (matrix[FIRST_ROW].some((ceilState) => ceilState === ALIVE)) {
    matrix.unshift(Array(matrix[FIRST_ROW].length).fill(DEAD));
  }

  // bottom side
  const LAST_ROW = matrix.length - 1;
  if (matrix[LAST_ROW].some((ceilState) => ceilState === ALIVE)) {
    matrix.push(Array(matrix[LAST_ROW].length).fill(DEAD));
  }

  // left side
  const FIRST_CELL_OF_ROW = 0;
  if (matrix.some((row) => row[FIRST_CELL_OF_ROW] === ALIVE)) {
    matrix.forEach((row) => row.unshift(DEAD));
  }

  // right side
  const LAST_CELL_OF_ROW = matrix[FIRST_ROW].length - 1;
  if (matrix.some((row) => row[LAST_CELL_OF_ROW] === ALIVE)) {
    matrix.forEach((row) => row.push(DEAD));
  }

  return matrix;
}

// function displayMatrix(matrix: Matrix) {
//   console.clear();
//   console.log(matrixToString(matrix));
// }

export function startGame(matrix: Matrix, onUpdate: (matrix: Matrix) => void) {
  // displayMatrix(matrix);

  setInterval(() => {
    matrix = getNextMatrix(matrix);

    // displayMatrix(matrix);
    onUpdate(matrix);
  }, FRAME_INTERVAL);
}
