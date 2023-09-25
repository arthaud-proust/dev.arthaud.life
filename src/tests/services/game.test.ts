import { Game } from "@/services/game";
import { ALIVE, DEAD, Matrix } from "@/types";
import { delay } from "@/utils/delay";

test("should be paused when initiating game", () => {
  const game = new Game();

  const startMatrix: Matrix = [[ALIVE, DEAD]];
  game.init(startMatrix);

  expect(game.matrix).toStrictEqual(startMatrix);
  expect(game.isPlaying).toBe(false);
});

test("should set hasEnded to false when initiating game", () => {
  const game = new Game();

  const startMatrix: Matrix = [[ALIVE, DEAD]];
  game.init(startMatrix);

  expect(game.hasEnded).toBe(false);
});

test("should set hasStarted to true when playing", () => {
  const game = new Game();

  const startMatrix: Matrix = [[ALIVE, DEAD]];
  game.init(startMatrix);

  expect(game.hasStarted).toBe(false);

  game.play();

  expect(game.hasStarted).toBe(true);
});

test("should change frame interval and resuming if it was playing", () => {
  const game = new Game();

  const frameInterval = 1093892;
  game.play().setFrameInterval(frameInterval);

  expect(game.isPlaying).toBe(true);
  expect(game.frameMsInterval).toStrictEqual(frameInterval);
});

test("should change frame interval without resume if it was paused", () => {
  const game = new Game();

  const frameInterval = 1093892;
  game.setFrameInterval(frameInterval);

  expect(game.isPlaying).toBe(false);
  expect(game.frameMsInterval).toStrictEqual(frameInterval);
});

test("should not change matrix if paused", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 10;

  game.setFrameInterval(frameInterval).init(startMatrix);

  await delay(frameInterval + 1);

  expect(game.matrix).toStrictEqual(startMatrix);
});

test("should change matrix if playing", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 10;

  game.setFrameInterval(frameInterval).init(startMatrix).play();

  await delay(frameInterval + 1);

  expect(game.matrix).not.toStrictEqual(startMatrix);
});

test("can toggle cell state", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];

  game.init(startMatrix).toggleCellState([0, 0]);

  expect(game.matrix).toStrictEqual([[DEAD, DEAD]]);
});

test("can undo toggle cell state", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];

  game.init(startMatrix).toggleCellState([0, 0]);

  game.undo();

  expect(game.matrix).toStrictEqual(startMatrix);
});

test("can kill all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];

  game.init(startMatrix).killAllCells();

  expect(game.matrix).toStrictEqual([
    [DEAD, DEAD],
    [DEAD, DEAD],
  ]);
});

test("can undo kill all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];

  game.init(startMatrix).killAllCells();

  game.undo();

  expect(game.matrix).toStrictEqual(startMatrix);
});

test("can born all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];

  game.init(startMatrix).bornAllCells();

  expect(game.matrix).toStrictEqual([
    [ALIVE, ALIVE],
    [ALIVE, ALIVE],
  ]);
});

test("can undo born all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];

  game.init(startMatrix).bornAllCells();

  game.undo();

  expect(game.matrix).toStrictEqual(startMatrix);
});

test("should be able to undo if matrix history", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];

  expect(game.canUndo).toBe(false);

  game.init(startMatrix).toggleCellState([0, 0]);

  expect(game.canUndo).toBe(true);
});

test("reset should set state same as when game init", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, ALIVE],
    [DEAD, ALIVE],
  ];

  game.init(startMatrix).playWithoutTicking();

  game.tick;
  game.end();

  game.reset();

  expect(game.matrix).toStrictEqual(startMatrix);
  expect(game.isPlaying).toBe(false);
  expect(game.hasStarted).toBe(false);
  expect(game.hasEnded).toBe(false);
});

test("should end when no cell alive", async () => {
  const game = new Game();
  // this matrix will live 1 tick
  const startMatrix: Matrix = [
    [ALIVE, DEAD, ALIVE],
    [DEAD, DEAD, DEAD],
    [DEAD, ALIVE, DEAD],
  ];

  game.init(startMatrix).playWithoutTicking();

  game.tick();

  expect(game.isPlaying).toBe(true);
  expect(game.hasEnded).toBe(false);

  game.tick();

  expect(game.isPlaying).toBe(false);
  expect(game.hasEnded).toBe(true);
});
