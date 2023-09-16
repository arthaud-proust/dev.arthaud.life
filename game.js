/**
 * Separation of Concerns Principle :
 * Here should only appear code related to game start, run and display.
 */

const {DEAD, getNextStepCellState, ALIVE} = require("./life.js");

const FRAME_INTERVAL = 500;

let mat = [
    [DEAD, DEAD, DEAD, DEAD, DEAD],
    [DEAD, DEAD, DEAD, DEAD, DEAD],
    [DEAD, DEAD, ALIVE, ALIVE, ALIVE],
    [DEAD, DEAD, ALIVE, DEAD, DEAD],
    [DEAD, DEAD, DEAD, ALIVE, DEAD],
];

function printMat(mat) {
    console.clear()
    console.log(mat.map(row => row.map(ceil => ceil === ALIVE ? "■" : "□").join('  ')).join("\n"))
}

function getNextMat(mat) {
    const extendedMat = extendMat(mat);

    return extendedMat.map((row, x) =>
        row.map((ceil, y) =>
            getNextStepCellState(mat, [x, y])
        )
    )
}

function extendMat(mat) {
    // extend a mat side if its border contain an alive ceil

    // top
    if (mat[0].some(ceilState => ceilState === ALIVE)) {
        mat.unshift(Array(mat[0].length).fill(DEAD))
    }

    // bottom
    if (mat[mat.length - 1].some(ceilState => ceilState === ALIVE)) {
        mat.push(Array(mat[mat.length - 1].length).fill(DEAD));
    }

    // left
    if (mat.some(row => row[0] === ALIVE)) {
        mat.forEach(row => row.unshift(DEAD));
    }

    // right
    if (mat.some(row => row[row.length - 1] === ALIVE)) {
        mat.forEach(row => row.push(DEAD));
    }

    return mat
}

setInterval(() => {
    mat = getNextMat(mat);

    printMat(mat)
}, FRAME_INTERVAL);