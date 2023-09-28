import { Matrix, Organism, OrganismName } from "@/types";
import { getMatrixHeight, getMatrixWidth } from "@/utils/matrices";

export type OrganismFound = {
  name: OrganismName;
};

export class OrganismFinder {
  matrix: Matrix;

  constructor(matrix: Matrix) {
    this.matrix = matrix;
  }

  get organisms(): Array<OrganismFound> {
    return [];
  }

  findOrganismInMatrix(organism: Organism): Array<OrganismFound> {
    if (getMatrixWidth(organism.matrix) > getMatrixWidth(this.matrix)) {
      return [];
    }

    if (getMatrixHeight(organism.matrix) > getMatrixHeight(this.matrix)) {
      return [];
    }

    // const h = getMatrixHeight(this.matrix);
    // const w = getMatrixWidth(this.matrix);

    // const flatOrganismMatrix = flattenMatrix(organism.matrix);

    return [];
  }

  // flattenOrganism(organism: Organism, matrixWidth: number): FlattenedOrganism {}
}
