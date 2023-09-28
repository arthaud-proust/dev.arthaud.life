import { CellState } from "@/types/cell";

export type Matrix = Array<Array<CellState>>;

export interface FlattenedMatrix {
  cells: Array<CellState>;
  width: number;
}
