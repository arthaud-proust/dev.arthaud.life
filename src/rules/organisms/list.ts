import { ALIVE as A, DEAD as D, Organism } from "@/types";

export const organismsList: Array<Organism> = [
  {
    name: "blinker",
    matrix: [
      [D, A, D],
      [D, A, D],
      [D, A, D],
    ],
  },
  {
    name: "glider",
    matrix: [
      [D, A, D],
      [D, D, A],
      [A, A, A],
    ],
  },
  {
    name: "block",
    matrix: [
      [A, A],
      [A, A],
    ],
  },
];
