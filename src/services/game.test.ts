import { ALIVE, DEAD, Matrix } from "@/types/life";

import {
  getExtendedMatrix,
  getNextMatrix,
  matrixToString,
} from "@/services/game.ts";

describe("matToString", () => {
  test("should return formated cells", () => {
    const matrix: Matrix = [
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(matrixToString(matrix)).toBe("   ■   \n       \n      ■");
  });
});

describe("getExtendedMatrix", () => {
  test("should extend on all sides", () => {
    const matrix: Matrix = [
      [ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(getExtendedMatrix(matrix)).toStrictEqual([
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
    ]);
  });

  test("should not extend matrice", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getExtendedMatrix(matrix)).toStrictEqual([
      [DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
    ]);
  });
});

describe("getNextMatrix", () => {
  test("should kill the alive cell", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getNextMatrix(matrix)).toStrictEqual([
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ]);
  });

  test("make born new cell", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, ALIVE, ALIVE, ALIVE, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
    ];

    expect(getNextMatrix(matrix)).toStrictEqual([
      [DEAD, DEAD, DEAD, DEAD, DEAD],
      [DEAD, DEAD, ALIVE, DEAD, DEAD],
      [DEAD, DEAD, ALIVE, DEAD, DEAD],
      [DEAD, DEAD, ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD, DEAD, DEAD],
    ]);
  });
});
