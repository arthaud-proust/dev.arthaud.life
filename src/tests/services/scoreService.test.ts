import { ScoreService } from "@/services/scoreService";

describe("score history", () => {
  test("should be empty when service initalized", () => {
    const scoreService = new ScoreService();

    expect(scoreService.history).toStrictEqual([]);
  });
});

describe("score computation", () => {
  test("should return score", () => {
    const scoreService = new ScoreService();

    const score = scoreService.computeScore({
      matrixSize: 0,
      aliveCells: 0,
      cellsStock: 0,
    });

    expect(score).not.toBeNull();
  });

  test("should add score to history", () => {
    const scoreService = new ScoreService();

    const score = scoreService.computeScore({
      matrixSize: 0,
      aliveCells: 0,
      cellsStock: 0,
    });

    expect(scoreService.history).toStrictEqual([score]);
  });
});

describe("bestScore", () => {
  test("should return null if no score in history", () => {
    const scoreService = new ScoreService();

    expect(scoreService.bestScore).toBeNull();
  });

  test("should return the best score in history", () => {
    const scoreService = new ScoreService();

    scoreService.computeScore({
      matrixSize: 0,
      aliveCells: 0,
      cellsStock: 0,
    });

    const bestScore = scoreService.computeScore({
      matrixSize: 100,
      aliveCells: 100,
      cellsStock: 100,
    });

    expect(scoreService.bestScore).toStrictEqual(bestScore);
  });
});

describe("lastScore", () => {
  test("should return null if no score in history", () => {
    const scoreService = new ScoreService();

    expect(scoreService.lastScore).toBeNull();
  });

  test("should return the last score in history", () => {
    const scoreService = new ScoreService();

    scoreService.computeScore({
      matrixSize: 0,
      aliveCells: 0,
      cellsStock: 0,
    });

    const lastScore = scoreService.computeScore({
      matrixSize: 100,
      aliveCells: 100,
      cellsStock: 100,
    });

    expect(scoreService.lastScore).toStrictEqual(lastScore);
  });
});
