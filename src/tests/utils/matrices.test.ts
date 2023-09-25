import { ALIVE, DEAD, Matrix } from "@/types";
import { base64ToMatrix, cloneMatrix, matrixToBase64 } from "@/utils/matrices";

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

test("can convert matrix to base64 string", () => {
  const matrix: Matrix = [
    [ALIVE, DEAD, ALIVE],
    [ALIVE, ALIVE, ALIVE],
    [ALIVE, DEAD, DEAD],
  ];

  const string = matrixToBase64(matrix);

  expect(string).not.toBeNull();
  expect(string).toBe("My4xMDExMTExMDA=");
});

test("can retrieve matrix from base64 string", () => {
  const matrix: Matrix = [
    [ALIVE, DEAD, ALIVE],
    [ALIVE, ALIVE, ALIVE],
    [ALIVE, DEAD, DEAD],
  ];
  const string = matrixToBase64(matrix);

  const retrievedMatrix = base64ToMatrix(string);

  expect(retrievedMatrix).toStrictEqual(matrix);
});
