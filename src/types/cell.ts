export const DEAD = 0;
export const ALIVE = 1;

export type CellState = typeof DEAD | typeof ALIVE;

export type CellCoords = [number, number];
