/**
 * Separation of Concerns Principle :
 * Here should only appear code related to game start, run, stop, speed.
 */

import { getNextMatrix } from "@/rules/turn";
import { Matrix } from "@/types/life";

export class Game {
  matrix: Matrix;
  frameMsInterval: number;
  isPlaying: boolean;
  _playingInterval: null | ReturnType<typeof setInterval>;

  constructor() {
    this.matrix = [];
    this.frameMsInterval = 100;
    this.isPlaying = false;
    this._playingInterval = null;
  }

  start(matrix: Matrix): this {
    this.matrix = matrix;

    this.play();

    return this;
  }

  setFrameInterval(ms: number): this {
    this.frameMsInterval = ms;
    this.pause();
    this.play();

    return this;
  }

  play(): this {
    this.isPlaying = true;

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

  _makeTurn(): this {
    this.matrix = getNextMatrix(this.matrix);

    return this;
  }
}
