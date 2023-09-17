/**
 * Separation of Concerns Principle :
 * Here should only appear the basic game logic.
 * Here should not appear code related to display, animations, startup state, etc.
 * So, only game rules in this file!
 */
import { ALIVE, CellCoords, CellState, DEAD, Matrix } from "@/types/life";

const ALIVE_NEIGHBORS_CELLS_COUNT_TO_BORN = 3;
const ALIVE_NEIGHBORS_CELLS_COUNT_TO_LIVE = [2, 3];

export function getNextStepCellState(
  matrix: Matrix,
  [x, y]: CellCoords,
): CellState {
  const ceilState = getCellState(matrix, [x, y]);
  const neighborsCellStates = getNeighborsCellStates(matrix, [x, y]);

  const aliveNeighborsCells = neighborsCellStates.filter(
    (ceilState) => ceilState === ALIVE,
  ).length;

  if (
    ceilState === DEAD &&
    aliveNeighborsCells === ALIVE_NEIGHBORS_CELLS_COUNT_TO_BORN
  ) {
    return ALIVE;
  }

  if (
    ceilState === ALIVE &&
    ALIVE_NEIGHBORS_CELLS_COUNT_TO_LIVE.includes(aliveNeighborsCells)
  ) {
    return ALIVE;
  }

  return DEAD;
}

export function getNeighborsCellStates(
  matrix: Matrix,
  [x, y]: CellCoords,
): Array<CellState> {
  const topLeft = getCellState(matrix, [x - 1, y - 1]);
  const topCenter = getCellState(matrix, [x, y - 1]);
  const topRight = getCellState(matrix, [x + 1, y - 1]);

  const midLeft = getCellState(matrix, [x - 1, y]);
  const midRight = getCellState(matrix, [x + 1, y]);

  const bottomLeft = getCellState(matrix, [x - 1, y + 1]);
  const bottomCenter = getCellState(matrix, [x, y + 1]);
  const bottomRight = getCellState(matrix, [x + 1, y + 1]);

  return [
    topLeft,
    topCenter,
    topRight,
    midLeft,
    midRight,
    bottomLeft,
    bottomCenter,
    bottomRight,
  ];
}

export function getCellState(matrix: Matrix, [x, y]: CellCoords): CellState {
  return matrix[y]?.[x] ?? DEAD;
}
