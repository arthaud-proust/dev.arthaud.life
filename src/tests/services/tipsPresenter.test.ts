import { TipsPresenter } from "@/services/tipsPresenter";
import { Tip } from "@/types/tip";

describe("list", () => {
  test("should be empty by default", () => {
    const tipsPresenter = new TipsPresenter();

    expect(tipsPresenter.list).toStrictEqual([]);
  });

  test("should be loadable", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Test",
      },
    ];

    tipsPresenter.load(tipsList);

    expect(tipsPresenter.list).toStrictEqual(tipsList);
  });
});

describe("tip reading", () => {
  test("read tip should mark is as read", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be marked as read",
      },
    ];
    tipsPresenter.load(tipsList);

    tipsPresenter.readTip(1);

    expect(tipsPresenter.tipHasBeenRead(1)).toBe(true);
  });
});

describe("tipsToDisplay", () => {
  test("should return tips that hasn't been read", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be returned because not read",
      },
      {
        id: 2,
        text: "Should be returned because not read",
      },
      {
        id: 3,
        text: "Should not be returned because read",
      },
    ];
    tipsPresenter.load(tipsList);

    tipsPresenter.readTip(3);

    expect(tipsPresenter.tipsToDisplay()).toStrictEqual([
      tipsList[0],
      tipsList[1],
    ]);
  });

  test("should return tips that matches minScore rule", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be returned because minScore egals to 10",
        rules: {
          minScore: 10,
        },
      },
      {
        id: 2,
        text: "Should be returned too because minScore inferior to 10",
        rules: {
          minScore: 5,
        },
      },
      {
        id: 3,
        text: "Should not be returned because minScore superior to 10",
        rules: {
          minScore: 11,
        },
      },
    ];
    tipsPresenter.load(tipsList);

    expect(tipsPresenter.tipsToDisplay({ score: 10 })).toStrictEqual([
      tipsList[0],
      tipsList[1],
    ]);
    expect(tipsPresenter.tipsToDisplay({ score: 0 })).toStrictEqual([]);
  });

  test("should return tips that matches minGridSize rule", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be returned because minMatrixSize egals to 10",
        rules: {
          minMatrixSize: 10,
        },
      },
      {
        id: 2,
        text: "Should be returned too because minMatrixSize inferior to 10",
        rules: {
          minMatrixSize: 5,
        },
      },
      {
        id: 3,
        text: "Should not be returned because minMatrixSize superior to 10",
        rules: {
          minMatrixSize: 11,
        },
      },
    ];
    tipsPresenter.load(tipsList);

    expect(tipsPresenter.tipsToDisplay({ matrixSize: 10 })).toStrictEqual([
      tipsList[0],
      tipsList[1],
    ]);
    expect(tipsPresenter.tipsToDisplay({ matrixSize: 0 })).toStrictEqual([]);
  });

  test("should return tips that matches minCellsStock rule", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be returned because minCellsStock egals to 10",
        rules: {
          minCellsStock: 10,
        },
      },
      {
        id: 2,
        text: "Should be returned too because minCellsStock inferior to 10",
        rules: {
          minCellsStock: 5,
        },
      },
      {
        id: 3,
        text: "Should not be returned because minCellsStock superior to 10",
        rules: {
          minCellsStock: 11,
        },
      },
    ];
    tipsPresenter.load(tipsList);

    expect(tipsPresenter.tipsToDisplay({ cellsStock: 10 })).toStrictEqual([
      tipsList[0],
      tipsList[1],
    ]);
    expect(tipsPresenter.tipsToDisplay({ cellsStock: 0 })).toStrictEqual([]);
  });

  test("should return tips that matches minTurns rule", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be returned because minTurns egals to 10",
        rules: {
          minTurns: 10,
        },
      },
      {
        id: 2,
        text: "Should be returned too because minTurns inferior to 10",
        rules: {
          minTurns: 5,
        },
      },
      {
        id: 3,
        text: "Should not be returned because minTurns superior to 10",
        rules: {
          minTurns: 11,
        },
      },
    ];
    tipsPresenter.load(tipsList);

    expect(tipsPresenter.tipsToDisplay({ turns: 10 })).toStrictEqual([
      tipsList[0],
      tipsList[1],
    ]);
    expect(tipsPresenter.tipsToDisplay({ turns: 0 })).toStrictEqual([]);
  });

  test("should return tips that matches multiple rules", () => {
    const tipsPresenter = new TipsPresenter();
    const tipsList: Array<Tip> = [
      {
        id: 1,
        text: "Should be returned because minCellsStock egals to 10 AND minScore inferior to 6",
        rules: {
          minCellsStock: 10,
          minScore: 5,
        },
      },
      {
        id: 2,
        text: "Should not be returned because minCellsStock superior to 10 AND minScore superior to 6",
        rules: {
          minCellsStock: 11,
          minScore: 7,
        },
      },
    ];
    tipsPresenter.load(tipsList);

    expect(
      tipsPresenter.tipsToDisplay({ cellsStock: 10, score: 6 }),
    ).toStrictEqual([tipsList[0]]);
  });
});
