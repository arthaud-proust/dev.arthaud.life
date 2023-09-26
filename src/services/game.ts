/**
 * Separation of Concerns Principle :
 * Here should only appear code related to game start, run, stop, speed.
 */

import { getNextMatrix } from "@/rules/matrix";
import { ALIVE, CellCoords, CellState, DEAD, Matrix } from "@/types";
import {
  cloneMatrix,
  getAliveCellsCount,
  getDiffAliveCellsCount,
} from "@/utils/matrices";

export const CELLS_COUNT_START = 3;

export class Game {
  _turnsCount: number;
  _baseCellsStock: number;
  _cellsStock: number;
  _baseMatrix: Matrix;
  _matrixHistory: Array<Matrix> = [];
  matrix: Matrix;
  frameMsInterval: number;
  isPlaying: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  _playingInterval: null | ReturnType<typeof setInterval>;

  constructor() {
    this._turnsCount = 0;
    this._baseCellsStock = CELLS_COUNT_START;
    this._cellsStock = CELLS_COUNT_START;
    this._baseMatrix = [];
    this._matrixHistory = [];
    this.matrix = [];
    this.frameMsInterval = 100;
    this.isPlaying = false;
    this.hasStarted = false;
    this.hasEnded = false;
    this._playingInterval = null;
  }

  init(matrix: Matrix, cellsStock: number = CELLS_COUNT_START): this {
    this._baseMatrix = cloneMatrix(matrix);
    this._baseCellsStock = cellsStock;

    this.reset();

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
    this.playWithoutTicking();

    this._setAutoTicking();

    return this;
  }

  _setAutoTicking(): this {
    this._playingInterval = setInterval(() => {
      if (!this.isPlaying) {
        return;
      }

      this.tick();
    }, this.frameMsInterval);

    return this;
  }

  /**
   * For test purpose only.
   * Start game without setting a frame interval,
   * so the game will go one step forward only when you call the tick() method
   * @returns this
   */
  playWithoutTicking(): this {
    this.isPlaying = true;
    this.hasStarted = true;

    return this;
  }

  pause(): this {
    this.isPlaying = false;

    if (this._playingInterval) {
      clearInterval(this._playingInterval);
    }

    return this;
  }

  end(): this {
    this.pause();
    this.hasEnded = true;

    return this;
  }

  reset(): this {
    this._turnsCount = 0;
    this.matrix = cloneMatrix(this._baseMatrix);
    this._cellsStock = this._baseCellsStock;

    this.pause();
    this.hasStarted = false;
    this.hasEnded = false;

    return this;
  }

  toggleCellState(cellCoords: CellCoords): this {
    this._saveMatrixToHistory();

    const cellState: CellState = this.matrix[cellCoords[1]][cellCoords[0]];

    if (cellState === ALIVE) {
      this._cellsStock++;
      this.matrix[cellCoords[1]][cellCoords[0]] = DEAD;
    } else if (cellState === DEAD && this.canAddCell) {
      this._cellsStock--;
      this.matrix[cellCoords[1]][cellCoords[0]] = ALIVE;
    }

    return this;
  }

  undo(): this {
    const previousMatrix = this._matrixHistory.pop();

    if (!previousMatrix) {
      return this;
    }

    const cellsStockDiff = getDiffAliveCellsCount(previousMatrix, this.matrix);

    this._cellsStock += cellsStockDiff;
    this.matrix = previousMatrix;

    return this;
  }

  get turnsCount(): number {
    return this._turnsCount;
  }

  get canUndo(): boolean {
    return !!this._matrixHistory.length;
  }

  get cellsStock(): number {
    return this._cellsStock;
  }

  get canAddCell(): boolean {
    return this.cellsStock > 0;
  }

  get previousMatrix(): Matrix | null {
    if (!this._matrixHistory.length) {
      return null;
    }

    return this._matrixHistory[this._matrixHistory.length - 1];
  }

  get cellsStockDiffFromPreviousMatrix(): number {
    if (!this.previousMatrix) {
      return 0;
    }

    return getDiffAliveCellsCount(this.previousMatrix, this.matrix);
  }

  removeAllCells(): this {
    this._saveMatrixToHistory();

    this.matrix = this.matrix.map((row) => row.map((_cell) => DEAD));

    this._cellsStock -= this.cellsStockDiffFromPreviousMatrix;

    return this;
  }

  tick(): this {
    this._turnsCount++;

    this.matrix = getNextMatrix(this.matrix);

    this._checkEnd();

    return this;
  }

  _saveMatrixToHistory(): Matrix {
    const previousMatrix = cloneMatrix(this.matrix);

    this._matrixHistory.push(previousMatrix);

    return previousMatrix;
  }

  _isEnded(): boolean {
    return 0 >= getAliveCellsCount(this.matrix);
  }

  _checkEnd(): this {
    if (this._isEnded()) {
      this.end();
    }

    return this;
  }
}
