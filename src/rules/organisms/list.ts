import { ALIVE as A, DEAD as D, Organism } from "@/types";

export const organismsList: { [key: string]: Organism } = {
  blinker: [
    [D, A, D],
    [D, A, D],
    [D, A, D],
  ],
  glider: [
    [D, A, D],
    [D, D, A],
    [A, A, A],
  ],
  block: [
    [A, A],
    [A, A],
  ],
};
