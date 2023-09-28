import { FlattenedMatrix, Matrix } from "@/types/matrix";

export type OrganismName = string;

export interface Organism {
  name: OrganismName;
  matrix: Matrix;
}

export interface FlattenedOrganism {
  name: OrganismName;
  matrix: FlattenedMatrix;
}
