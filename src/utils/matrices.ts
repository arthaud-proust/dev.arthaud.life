import { ALIVE as A, ALIVE, DEAD as D, FlattenedMatrix, Matrix } from "@/types";

export function getMatrixSize(matrix: Matrix): number {
  let count = 0;

  matrix.forEach((row) =>
    row.forEach((_cellState) => {
      count++;
    }),
  );

  return count;
}

export function getMatrixHeight(matrix: Matrix): number {
  return matrix.length;
}

export function getMatrixWidth(matrix: Matrix): number {
  if (!matrix.length) {
    return 0;
  }

  return matrix[0].length;
}

export function flattenMatrix(matrix: Matrix): FlattenedMatrix {
  return {
    cells: matrix.flat(1),
    width: getMatrixWidth(matrix),
  };
}

export function unflattenMatrix(flattenedMatrix: FlattenedMatrix): Matrix {
  if (!flattenedMatrix.cells.length || flattenedMatrix.width === 0) {
    return [];
  }

  const cellsCopy = Array.from(flattenedMatrix.cells);
  const matrix = [];

  while (cellsCopy.length > 0)
    matrix.push(cellsCopy.splice(0, flattenedMatrix.width));

  return matrix;
}

export function getAliveCellsCount(matrix: Matrix): number {
  let count = 0;

  matrix.forEach((row) =>
    row.forEach((cellState) => {
      if (cellState === ALIVE) {
        count++;
      }
    }),
  );

  return count;
}

export function getDiffAliveCellsCount(a: Matrix, b: Matrix): number {
  const aCount = getAliveCellsCount(a);
  const bCount = getAliveCellsCount(b);

  return bCount - aCount;
}

export function cloneMatrix(matrix: Matrix): Matrix {
  return Array.from(matrix.map((row) => Array.from(row)));
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

export const level1: Matrix = [
  [D, D, D, D, D],
  [D, D, D, D, D],
  [D, D, D, D, D],
  [D, D, D, D, D],
  [D, D, D, D, D],
];
