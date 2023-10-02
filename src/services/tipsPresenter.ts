import { Tip, TipId, TipRulesInput } from "@/types/tip";

export class TipsPresenter {
  _list: Array<Tip>;
  _hasBeenRead: Set<TipId>;

  constructor() {
    this._list = [];
    this._hasBeenRead = new Set();
  }

  load(tips: Array<Tip>): this {
    this._list = tips;

    return this;
  }

  get list(): Array<Tip> {
    return this._list;
  }

  readTip(tipId: TipId): this {
    this._hasBeenRead.add(tipId);

    return this;
  }

  tipHasBeenRead(tipId: TipId): boolean {
    return this._hasBeenRead.has(tipId);
  }

  tipsToDisplay(rulesInput?: TipRulesInput): Array<Tip> {
    return this._list.filter((tip) => {
      if (this.tipHasBeenRead(tip.id)) {
        return false;
      }

      if (!tip.rules || !rulesInput) {
        return true;
      }

      if (
        rulesInput.score &&
        tip.rules.minScore &&
        rulesInput.score < tip.rules.minScore
      ) {
        return false;
      }

      if (
        rulesInput.matrixSize &&
        tip.rules.minMatrixSize &&
        rulesInput.matrixSize < tip.rules.minMatrixSize
      ) {
        return false;
      }

      if (
        rulesInput.cellsStock &&
        tip.rules.minCellsStock &&
        rulesInput.cellsStock < tip.rules.minCellsStock
      ) {
        return false;
      }

      if (
        rulesInput.turns &&
        tip.rules.minTurns &&
        rulesInput.turns < tip.rules.minTurns
      ) {
        return false;
      }

      return true;
    });
  }
}
