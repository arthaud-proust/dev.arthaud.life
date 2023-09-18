import { ALIVE, DEAD, Matrix } from "@/types/life";
import { delay } from "@/utils/delay";
import { Game } from "./game";

test("should play when start game", () => {
  const game = new Game();

  const startMatrix: Matrix = [[ALIVE, DEAD]];
  game.start(startMatrix);

  expect(game.matrix).toStrictEqual(startMatrix);
  expect(game.isPlaying).toBe(true);
});

test("should change frame interval", () => {
  const game = new Game();

  const frameInterval = 1093892;
  game.setFrameInterval(frameInterval);

  expect(game.frameMsInterval).toStrictEqual(frameInterval);
});

test("should not change matrix if paused", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 10;

  game.setFrameInterval(frameInterval).start(startMatrix).pause();

  await delay(frameInterval + 1);

  expect(game.matrix).toStrictEqual(startMatrix);
});

test("should change matrix if playing", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 10;

  game.setFrameInterval(frameInterval).start(startMatrix);

  await delay(frameInterval + 1);

  expect(game.matrix).not.toStrictEqual(startMatrix);
});

test("can toggle cell state", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];

  game.start(startMatrix).toggleCellState([0, 0]);

  expect(game.matrix).toStrictEqual([[DEAD, DEAD]]);
});

test("can kill all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];

  game.start(startMatrix).killAllCells();

  expect(game.matrix).toStrictEqual([
    [DEAD, DEAD],
    [DEAD, DEAD],
  ]);
});

test("can born all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];

  game.start(startMatrix).bornAllCells();

  expect(game.matrix).toStrictEqual([
    [ALIVE, ALIVE],
    [ALIVE, ALIVE],
  ]);
});
