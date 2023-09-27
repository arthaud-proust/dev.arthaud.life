import { ALIVE, DEAD, Matrix } from "@/types";
import {
  cloneMatrix,
  getAliveCellsCount,
  getDiffAliveCellsCount,
  getMatrixSize,
} from "@/utils/matrices";

test("return number of alive cells in matrix", () => {
  expect(getAliveCellsCount([])).toBe(0);

  expect(getAliveCellsCount([[]])).toBe(0);

  expect(
    getAliveCellsCount([
      [ALIVE, DEAD, ALIVE],
      [DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD],
    ]),
  ).toBe(3);
});

describe("getMatrixSize", () => {
  test("should return 0 for empty matrix", () => {
    const matrix: Matrix = [];

    const size = getMatrixSize(matrix);

    expect(size).toBe(0);
  });

  test("should return 0 for empty rows matrix", () => {
    const matrix: Matrix = [[]];

    const size = getMatrixSize(matrix);

    expect(size).toBe(0);
  });

  test("should return number of cells (alive or dead)", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [ALIVE, DEAD, DEAD],
    ];

    const size = getMatrixSize(matrix);

    expect(size).toBe(6);
  });
});

describe("getDiffAliveCellsCount", () => {
  test("return positive number if second matrix has more alive cells than the first", () => {
    const firstMatrix: Matrix = [
      [DEAD, DEAD],
      [DEAD, ALIVE],
    ];
    const secondMatrix: Matrix = [
      [ALIVE, ALIVE],
      [ALIVE, ALIVE],
    ];

    const diff = getDiffAliveCellsCount(firstMatrix, secondMatrix);
    expect(diff).toBe(3);
  });

  test("return negative number if second matrix has less alive cells than the first", () => {
    const firstMatrix: Matrix = [
      [ALIVE, ALIVE],
      [ALIVE, ALIVE],
    ];
    const secondMatrix: Matrix = [
      [DEAD, DEAD],
      [DEAD, ALIVE],
    ];

    const diff = getDiffAliveCellsCount(firstMatrix, secondMatrix);
    expect(diff).toBe(-3);
  });

  test("return 0 if both matrices has same alive cells count", () => {
    const sameMatrix: Matrix = [
      [ALIVE, ALIVE],
      [ALIVE, ALIVE],
    ];

    const diff = getDiffAliveCellsCount(sameMatrix, sameMatrix);
    expect(diff).toBe(0);
  });
});

test("clone matrix without any shallow reference", async () => {
  let matrixA: Matrix = [[ALIVE, DEAD]];
  let matrixB: Matrix = [[ALIVE, DEAD]];
  let matrixC: Matrix = [[ALIVE, DEAD]];

  let cloneA = cloneMatrix(matrixA);
  let cloneB = cloneMatrix(matrixB);
  let cloneC = cloneMatrix(matrixC);

  cloneA = [[DEAD, DEAD]];
  cloneB[0] = [DEAD, DEAD];
  cloneC[0][0] = DEAD;

  expect(matrixA).not.toStrictEqual(cloneA);
  expect(matrixB).not.toStrictEqual(cloneB);
  expect(matrixC).not.toStrictEqual(cloneC);
});
