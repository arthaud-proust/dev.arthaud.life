import {
  getAliveCellsScore,
  getCellsStockScore,
  getMatrixSizeScore,
  getScore,
} from "@/utils/score";

describe("matrix size score", () => {
  test("score should be equal to 0 when input <= 25", () => {
    const matrixSize = 25;

    const score = getMatrixSizeScore(matrixSize);

    expect(score).toBe(0);
  });

  test("score should be multiplied by 2 when input > 25", () => {
    const matrixSize = 26;

    const score = getMatrixSizeScore(matrixSize);

    expect(score).toBe(2 * matrixSize);
  });

  test("score should be multiplied by 5 when input > 50", () => {
    const matrixSize = 51;

    const score = getMatrixSizeScore(matrixSize);

    expect(score).toBe(5 * matrixSize);
  });

  test("score should be multiplied by 20 when input > 70", () => {
    const matrixSize = 71;

    const score = getMatrixSizeScore(matrixSize);

    expect(score).toBe(20 * matrixSize);
  });

  test("score should be multiplied by 2 when input > 90", () => {
    const matrixSize = 91;

    const score = getMatrixSizeScore(matrixSize);

    expect(score).toBe(2 * matrixSize);
  });
});

describe("alive cells score", () => {
  test("score should be equal to 0 then input <= 0", () => {
    const aliveCells = 0;

    const score = getAliveCellsScore(aliveCells);

    expect(score).toBe(0);
  });

  test("score should be multiplied by 5 when input > 0", () => {
    const aliveCells = 1;

    const score = getAliveCellsScore(aliveCells);

    expect(score).toBe(5 * aliveCells);
  });

  test("score should be multiplied by 10 when input > 20", () => {
    const aliveCells = 21;

    const score = getAliveCellsScore(aliveCells);

    expect(score).toBe(10 * aliveCells);
  });
});

describe("cells stock score", () => {
  test("score should be equal to 0 when input <= 3", () => {
    const cellsStock = 3;

    const score = getCellsStockScore(cellsStock);

    expect(score).toBe(0);
  });

  test("score should be multiplied by 3 when input > 3", () => {
    const cellsStock = 4;

    const score = getCellsStockScore(cellsStock);
    expect(score).toBe(3 * cellsStock);
  });
});

describe("global score", () => {
  test("should return the addition of each score", () => {
    const matrixSize = 1;
    const aliveCells = 1;
    const cellsStock = 1;

    const score = getScore({ matrixSize, aliveCells, cellsStock });
    expect(score.global).toBe(
      score.details.matrixSize +
        score.details.aliveCells +
        score.details.cellsStock,
    );
  });
});
