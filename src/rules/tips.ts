import { Tip } from "@/types/tip";

export const tips: Array<Tip> = [
  {
    id: 1,
    title: "Grow the matrix!",
    text: "You can make the matrix grow, and that gives you points! But don't go too far...",
    rules: {
      minMatrixSize: 26, // when user discover how to increase size of matrix
    },
  },
  {
    id: 2,
    title: "Tic tac, tic tac...",
    text: "Turns passes when you play! But there is a limit...",
    rules: {
      minTurns: 20, // when user play a little
    },
  },
  {
    id: 3,
    title: "Get cells in stock!",
    text: "You discovered how to farm cells, abuse it to get more points!",
    rules: {
      minCellsStock: 4, // when user discover how farm cells
    },
  },
];
