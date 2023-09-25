import { ALIVE as A, CellState, DEAD as D, Matrix } from "@/types";

export function cloneMatrix(matrix: Matrix): Matrix {
  return Array.from(matrix.map((row) => Array.from(row)));
}

export function matrixToBase64(matrix: Matrix): string {
  const matrixContent = matrix.map((row) => row.join("")).join("");

  const matrixColLength = matrix.length;

  const matrixDataString = `${matrixColLength}.${matrixContent}`;

  return btoa(matrixDataString);
}

export function base64ToMatrix(string: string): Matrix {
  const binaryString = atob(string);

  const [matrixColLengthStr, matrixContent] = binaryString.split(".");
  const matrixColLength = parseInt(matrixColLengthStr);
  const matrixRowLength = matrixContent.length / matrixColLength;

  const matrix: Matrix = [];
  for (let i = 0; i < matrixColLength; i++) {
    matrix.push([]);
    for (let j = 0; j < matrixColLength; j++) {
      const cellState = parseInt(
        matrixContent[i * matrixRowLength + j],
      ) as CellState;

      matrix[i].push(cellState);
    }
  }

  return matrix;
}

export const exampleRule1: Matrix = [
  [D, D, D, D, D],
  [D, D, A, D, D],
  [D, D, D, D, D],
  [D, A, D, A, D],
  [D, D, D, D, D],
];

export const exampleRule2: Matrix = [
  [D, D, D, D, D],
  [D, D, D, A, D],
  [D, D, A, D, D],
  [D, A, D, D, D],
  [D, D, D, D, D],
];

export const exampleRule3: Matrix = [
  [D, D, D, D, D],
  [D, D, D, D, D],
  [D, D, A, D, D],
  [D, D, D, D, D],
  [D, D, D, D, D],
];

export const planner: Matrix = [
  [D, D, D, D, D],
  [D, D, A, D, D],
  [D, D, D, A, D],
  [D, A, A, A, D],
  [D, D, D, D, D],
];

// prettier-ignore
export const plannerCannon: Matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const turnSignal: Matrix = [
  [D, D, D],
  [A, A, A],
  [D, D, D],
];
