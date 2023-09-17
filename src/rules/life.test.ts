import { ALIVE, DEAD, Matrix } from "../types/life.ts";

import {
  getCellState,
  getNeighborsCellStates,
  getNextStepCellState,
} from "./life.ts";

describe("getCellState", () => {
  test("return cell state", () => {
    const matrix: Matrix = [
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getCellState(matrix, [1, 0])).toBe(ALIVE);
  });

  test("return dead if out of matrice", () => {
    const matrix: Matrix = [
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getCellState(matrix, [3, 0])).toBe(DEAD);
  });
});

describe("getNeighborsCellStates", () => {
  test("return top left state", () => {
    const matrix: Matrix = [
      [ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[0]).toBe(ALIVE);
  });

  test("return top center state", () => {
    const matrix: Matrix = [
      [DEAD, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[1]).toBe(ALIVE);
  });

  test("return top right state", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[2]).toBe(ALIVE);
  });

  test("return mid left state", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [ALIVE, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[3]).toBe(ALIVE);
  });

  test("return mid right state", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, ALIVE],
      [DEAD, DEAD, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[4]).toBe(ALIVE);
  });

  test("return bottom left state", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [ALIVE, DEAD, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[5]).toBe(ALIVE);
  });

  test("return bottom center state", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, ALIVE, DEAD],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[6]).toBe(ALIVE);
  });

  test("return bottom right state", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(getNeighborsCellStates(matrix, [1, 1])[7]).toBe(ALIVE);
  });
});

describe("getNextStepCellState", () => {
  test("center cell should born", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [ALIVE, DEAD, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(getNextStepCellState(matrix, [1, 1])).toBe(ALIVE);
  });

  test("center cell should live", () => {
    const matrix: Matrix = [
      [DEAD, DEAD, ALIVE],
      [ALIVE, ALIVE, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(getNextStepCellState(matrix, [1, 1])).toBe(ALIVE);

    const matrix2: Matrix = [
      [DEAD, DEAD, DEAD],
      [ALIVE, ALIVE, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(getNextStepCellState(matrix2, [1, 1])).toBe(ALIVE);
  });

  test("center cell should die", () => {
    const matrix: Matrix = [
      [DEAD, ALIVE, ALIVE],
      [ALIVE, ALIVE, DEAD],
      [DEAD, DEAD, ALIVE],
    ];

    expect(getNextStepCellState(matrix, [1, 1])).toBe(DEAD);
  });
});
