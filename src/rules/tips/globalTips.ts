import { Tip } from "@/types/tip";

export const globalTips: Array<Tip> = [
  {
    id: 1,
    title: "Get more cells!",
    text: `The basic way to gain a cell is to make a "L" with 3 cells, abuse it to get more points! 
    For sure, there is more efficient way to gain cells...`,
  },
  {
    id: 2,
    title: "Tic tac, tic tac...",
    text: `Turns passes when you let the game play! 
    Be efficient because there is a limit...`,
  },
  {
    id: 3,
    title: "Get cells back in stock!",
    text: `You can remove cells from the matrix and put them back in your stock... for free!`,
  },
  {
    id: 4,
    title: "Grow the matrix!",
    text: `Matrix will grow if a cell is present on an edge. Make matrix bigger to get more points! 
    But don't be too greedy...`,
  },
  {
    id: 5,
    title: "Matrix or stock?",
    text: `Cells on the matrix give you more points that cells in stock.`,
  },
];
