import { CELLS_COUNT_START, Game } from "@/services/game";
import { ALIVE, DEAD, Matrix } from "@/types";
import { delay } from "@/utils/delay";

describe("Initiating game", () => {
  test("should pause game", () => {
    const game = new Game();

    const startMatrix: Matrix = [[ALIVE, DEAD]];
    game.init(startMatrix);

    expect(game.matrix).toStrictEqual(startMatrix);
    expect(game.isPlaying).toBe(false);
  });

  test("should set hasEnded to false", () => {
    const game = new Game();

    const startMatrix: Matrix = [[ALIVE, DEAD]];
    game.init(startMatrix);

    expect(game.hasEnded).toBe(false);
  });

  test("should set cells stock", () => {
    const game = new Game();

    const startMatrix: Matrix = [[ALIVE, DEAD]];
    const startStock = Math.round(Math.random() * 1000);
    game.init(startMatrix, startStock);

    expect(game.cellsStock).toBe(startStock);
  });

  test("should start with default cells stock if not provided", () => {
    const game = new Game();

    const startMatrix: Matrix = [[ALIVE, DEAD]];
    game.init(startMatrix);

    expect(game.cellsStock).toBe(CELLS_COUNT_START);
  });
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

  const frameInterval = Math.round(Math.random() * 1000);
  game.play().setFrameInterval(frameInterval);

  expect(game.isPlaying).toBe(true);
  expect(game.frameMsInterval).toStrictEqual(frameInterval);
});

test("should change frame interval without resume if it was paused", () => {
  const game = new Game();

  const frameInterval = Math.round(Math.random() * 1000);
  game.setFrameInterval(frameInterval);

  expect(game.isPlaying).toBe(false);
  expect(game.frameMsInterval).toStrictEqual(frameInterval);
});

test("should not change matrix if paused", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 2;

  game.setFrameInterval(frameInterval).init(startMatrix);

  await delay(frameInterval + 1);

  expect(game.matrix).toStrictEqual(startMatrix);
});

test("should change matrix if playing", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 2;

  game.setFrameInterval(frameInterval).init(startMatrix).play();

  await delay(frameInterval + 1);

  expect(game.matrix).not.toStrictEqual(startMatrix);
});

test("can toggle cell state", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];

  game.init(startMatrix, 0).toggleCellState([0, 0]);

  expect(game.matrix).toStrictEqual([[DEAD, DEAD]]);
  expect(game.cellsStock).toBe(1);
});

test("can undo toggle cell state", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  game.init(startMatrix, 0);

  game.toggleCellState([0, 0]);
  game.undo();

  expect(game.matrix).toStrictEqual(startMatrix);
  expect(game.cellsStock).toBe(0);
});

test("can remove all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];
  game.init(startMatrix, 0);

  game.removeAllCells();

  expect(game.matrix).toStrictEqual([
    [DEAD, DEAD],
    [DEAD, DEAD],
  ]);
  expect(game.cellsStock).toBe(2);
});

test("can undo remove all cells", async () => {
  const game = new Game();
  const startMatrix: Matrix = [
    [ALIVE, DEAD],
    [DEAD, ALIVE],
  ];
  game.init(startMatrix, 0);

  game.removeAllCells();
  game.undo();

  expect(game.matrix).toStrictEqual(startMatrix);
  expect(game.cellsStock).toBe(0);
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
  expect(game.cellsStock).toBe(CELLS_COUNT_START);
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
