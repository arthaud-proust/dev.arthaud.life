import { getScore } from "@/rules/score";
import { Score, ScoreInput } from "@/types/score";

export class ScoreService {
  _history: Array<Score>;

  constructor() {
    this._history = [];
  }

  get history(): Array<Score> {
    return this._history;
  }

  get bestScore(): Score | null {
    let bestScoreFound = null;

    for (let i = 0, iMax = this._history.length; i < iMax; i++) {
      let score = this._history[i];

      if (bestScoreFound && bestScoreFound.global > score.global) {
        continue;
      }

      bestScoreFound = score;
    }

    return bestScoreFound;
  }

  get lastScore(): Score | null {
    if (!this._history.length) {
      return null;
    }

    return this._history[this._history.length - 1];
  }

  computeScore(scoreInput: ScoreInput): Score {
    const score = getScore(scoreInput);

    this._history.push(score);

    return score;
  }
}
