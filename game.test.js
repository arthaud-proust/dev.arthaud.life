const {DEAD, ALIVE} = require("./life.js");
const {matrixToString, getExtendedMatrix, getNextMatrix} = require("./game.js");

describe('matToString', () => {
    test('should return formated cells', () => {
        const matrix = [
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, ALIVE],
        ]

        expect(matrixToString(matrix)).toBe("□  ■  □\n□  □  □\n□  □  ■");
    })
});

describe('getExtendedMatrix', () => {
    test('should extend on all sides', () => {
        const matrix = [
            [ALIVE, DEAD, DEAD],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, ALIVE],
        ]

        expect(getExtendedMatrix(matrix)).toStrictEqual([
            [DEAD, DEAD, DEAD, DEAD, DEAD],
            [DEAD, ALIVE, DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD, DEAD, DEAD],
        ]);
    })

    test('should not extend matrice', () => {
        const matrix = [
            [DEAD, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
        ]

        expect(getExtendedMatrix(matrix)).toStrictEqual([
            [DEAD, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
        ]);
    })
});


describe('getNextMatrix', () => {
    test('should kill the alive cell', () => {
        const matrix = [
            [DEAD, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD],
        ]

        expect(getNextMatrix(matrix)).toStrictEqual([
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD],
        ]);
    })

    test('make born new cell', () => {
        const matrix = [
            [DEAD, DEAD, DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD, DEAD, DEAD],
            [DEAD, ALIVE, ALIVE, ALIVE, DEAD],
            [DEAD, DEAD, DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD, DEAD, DEAD],
        ]

        expect(getNextMatrix(matrix)).toStrictEqual([
            [DEAD, DEAD, DEAD, DEAD, DEAD],
            [DEAD, DEAD, ALIVE, DEAD, DEAD],
            [DEAD, DEAD, ALIVE, DEAD, DEAD],
            [DEAD, DEAD, ALIVE, DEAD, DEAD],
            [DEAD, DEAD, DEAD, DEAD, DEAD],
        ]);
    })
});