import { ALIVE, DEAD, Matrix } from "@/types";
import { cloneMatrix } from "@/utils/matrices";

test("clone matrix without any shallow reference", async () => {
  let matrixA: Matrix = [[ALIVE, DEAD]];
  let matrixB: Matrix = [[ALIVE, DEAD]];
  let matrixC: Matrix = [[ALIVE, DEAD]];

  let cloneA = cloneMatrix(matrixA);
  let cloneB = cloneMatrix(matrixB);
  let cloneC = cloneMatrix(matrixC);

  cloneA = [[DEAD, DEAD]];
  cloneB[0] = [DEAD, DEAD];
  cloneC[0][0] = DEAD;

  expect(matrixA).not.toStrictEqual(cloneA);
  expect(matrixB).not.toStrictEqual(cloneB);
  expect(matrixC).not.toStrictEqual(cloneC);
});
