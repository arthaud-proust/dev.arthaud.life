export interface TipRulesInput {
  score?: number;
  matrixSize?: number;
  cellsStock?: number;
  turns?: number;
}

export interface TipRules {
  minScore?: number;
  minMatrixSize?: number;
  minCellsStock?: number;
  minTurns?: number;
}

export type TipId = number;

export interface Tip {
  id: TipId;
  title?: string;
  text: string;
  hasBeenRead?: boolean;
  rules?: TipRules;
}
