/**
 * Separation of Concerns Principle :
 * Here should only appear code related to game start, run and display.
 */

const {DEAD, getNextStepCellState, ALIVE} = require("./life.js");

const FRAME_INTERVAL = 1500;

function matrixToString(matrix) {
    return matrix.map(row =>
        row.map(ceil => ceil === ALIVE ? "■" : "□").join('  ')
    ).join("\n")
}

function getNextMatrix(matrix) {
    const extendedMatrix = getExtendedMatrix(matrix);

    return extendedMatrix.map((row, y) =>
        row.map((ceil, x) =>
            getNextStepCellState(matrix, [x, y])
        )
    )
}

function getExtendedMatrix(matrix) {
    // extend a matrix side if its border contain an alive ceil

    // top
    if (matrix[0].some(ceilState => ceilState === ALIVE)) {
        matrix.unshift(Array(matrix[0].length).fill(DEAD))
    }

    // bottom
    if (matrix[matrix.length - 1].some(ceilState => ceilState === ALIVE)) {
        matrix.push(Array(matrix[matrix.length - 1].length).fill(DEAD));
    }

    // left
    if (matrix.some(row => row[0] === ALIVE)) {
        matrix.forEach(row => row.unshift(DEAD));
    }

    // right
    if (matrix.some(row => row[row.length - 1] === ALIVE)) {
        matrix.forEach(row => row.push(DEAD));
    }

    return matrix
}

function displayMatrix(matrix) {
    console.clear()
    console.log(matrixToString(matrix));
}

function startGame(matrix) {
    displayMatrix(matrix);

    setInterval(() => {
        matrix = getNextMatrix(matrix);

        displayMatrix(matrix);
    }, FRAME_INTERVAL);
}


module.exports = {
    getExtendedMatrix,
    getNextMatrix,
    matrixToString,
    startGame
}