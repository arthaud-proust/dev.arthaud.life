/**
 * Separation of Concerns Principle :
 * Here should only appear code related to game start, run, stop, speed.
 */

import { getNextMatrix } from "@/rules/matrix";
import { ALIVE, CellCoords, CellState, DEAD, Matrix } from "@/types";
import { cloneMatrix } from "@/utils/matrices";

export class Game {
  _baseMatrix: Matrix;
  _matrixHistory: Array<Matrix> = [];
  matrix: Matrix;
  frameMsInterval: number;
  isPlaying: boolean;
  hasStarted: boolean;
  _playingInterval: null | ReturnType<typeof setInterval>;

  constructor() {
    this._baseMatrix = [];
    this._matrixHistory = [];
    this.matrix = [];
    this.frameMsInterval = 100;
    this.isPlaying = false;
    this.hasStarted = false;
    this._playingInterval = null;
  }

  init(matrix: Matrix): this {
    this._baseMatrix = cloneMatrix(matrix);
    this.matrix = cloneMatrix(matrix);

    this.pause();

    return this;
  }

  setFrameInterval(ms: number): this {
    const wasPreviouslyPlaying = this.isPlaying;

    this.frameMsInterval = ms;

    this.pause();
    if (wasPreviouslyPlaying) {
      this.play();
    }

    return this;
  }

  play(): this {
    this.isPlaying = true;
    this.hasStarted = true;

    this._playingInterval = setInterval(() => {
      if (!this.isPlaying) {
        return;
      }

      this._makeTurn();
    }, this.frameMsInterval);

    return this;
  }

  pause(): this {
    this.isPlaying = false;

    if (this._playingInterval) {
      clearInterval(this._playingInterval);
    }

    return this;
  }

  reset(): this {
    this.matrix = this._baseMatrix;

    this.pause();
    this.hasStarted = false;

    return this;
  }

  toggleCellState(cellCoords: CellCoords): this {
    this._saveMatrixToHistory();

    const cellState: CellState = this.matrix[cellCoords[1]][cellCoords[0]];

    this.matrix[cellCoords[1]][cellCoords[0]] =
      cellState === ALIVE ? DEAD : ALIVE;

    return this;
  }

  undo(): this {
    const previousMatrix = this._matrixHistory.pop();

    if (previousMatrix) {
      this.matrix = previousMatrix;
    }

    return this;
  }

  get canUndo(): boolean {
    return !!this._matrixHistory.length;
  }

  killAllCells(): this {
    this._saveMatrixToHistory();

    this.matrix = this.matrix.map((row) => row.map((_cell) => DEAD));

    return this;
  }

  bornAllCells(): this {
    this._saveMatrixToHistory();

    this.matrix = this.matrix.map((row) => row.map((_cell) => ALIVE));

    return this;
  }

  _makeTurn(): this {
    this.matrix = getNextMatrix(this.matrix);

    return this;
  }

  _saveMatrixToHistory(): this {
    this._matrixHistory.push(cloneMatrix(this.matrix));

    return this;
  }
}
