import { ALIVE, DEAD, FlattenedMatrix, Matrix } from "@/types";
import {
  cloneMatrix,
  flattenMatrix,
  getAliveCellsCount,
  getDiffAliveCellsCount,
  getMatrixHeight,
  getMatrixSize,
  getMatrixWidth,
  unflattenMatrix,
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

describe("getMatrixHeight", () => {
  test("should return 0 for empty matrix", () => {
    const matrix: Matrix = [];

    const size = getMatrixHeight(matrix);

    expect(size).toBe(0);
  });

  test("should return number of rows (alive or dead)", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [ALIVE, DEAD, DEAD],
    ];

    const size = getMatrixHeight(matrix);

    expect(size).toBe(2);
  });
});

describe("getMatrixWidth", () => {
  test("should return 0 for empty matrix", () => {
    const matrix: Matrix = [];

    const size = getMatrixWidth(matrix);

    expect(size).toBe(0);
  });

  test("should return 0 for empty rows matrix", () => {
    const matrix: Matrix = [[]];

    const size = getMatrixWidth(matrix);

    expect(size).toBe(0);
  });

  test("should return number of cols (alive or dead)", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [ALIVE, DEAD, DEAD],
    ];

    const size = getMatrixWidth(matrix);

    expect(size).toBe(3);
  });
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

describe("flattenMatrix", () => {
  test("should return empty for empty matrix", () => {
    const matrix: Matrix = [];

    const flattenedMatrix = flattenMatrix(matrix);

    expect(flattenedMatrix.cells).toStrictEqual([]);
    expect(flattenedMatrix.width).toBe(0);
  });

  test("should return empty for empty rows matrix", () => {
    const matrix: Matrix = [[]];

    const flattenedMatrix = flattenMatrix(matrix);

    expect(flattenedMatrix.cells).toStrictEqual([]);
    expect(flattenedMatrix.width).toBe(0);
  });

  test("should return cells and width for a filled matrix", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [ALIVE, DEAD, DEAD],
    ];

    const flattenedMatrix = flattenMatrix(matrix);

    expect(flattenedMatrix.cells).toStrictEqual([
      DEAD,
      DEAD,
      ALIVE,
      ALIVE,
      DEAD,
      DEAD,
    ]);
    expect(flattenedMatrix.width).toBe(3);
  });
});

describe("unflattenMatrix", () => {
  test("should return empty matrix for flattened matrix with no cells ", () => {
    const flattenedMatrix: FlattenedMatrix = { cells: [], width: 10 };

    const matrix = unflattenMatrix(flattenedMatrix);

    expect(matrix).toStrictEqual([]);
  });

  test("should return empty matrix for flattened matrix with 0 width ", () => {
    const flattenedMatrix: FlattenedMatrix = { cells: [DEAD, ALIVE], width: 0 };

    const matrix = unflattenMatrix(flattenedMatrix);

    expect(matrix).toStrictEqual([]);
  });

  test("should return filled matrix for flattened matrix with width and cells ", () => {
    const flattenedMatrix: FlattenedMatrix = {
      cells: [DEAD, ALIVE],
      width: 1,
    };

    const matrix = unflattenMatrix(flattenedMatrix);

    expect(matrix).toStrictEqual([[DEAD], [ALIVE]]);
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
