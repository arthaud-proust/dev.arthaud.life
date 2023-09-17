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

test("should call onMatrixUpdate when matrix updated", async () => {
  const game = new Game();
  const startMatrix: Matrix = [[ALIVE, DEAD]];
  const frameInterval = 10;

  let test = false;

  game.onMatrixUpdate(() => (test = true));
  game.setFrameInterval(frameInterval).start(startMatrix);

  await delay(frameInterval + 1);

  expect(test).toBe(true);
});
