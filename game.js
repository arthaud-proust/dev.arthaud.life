const {DEAD, getNextStepCellState, ALIVE} = require("./life.js");

let mat = [
    [DEAD, ALIVE, DEAD],
    [DEAD, ALIVE, DEAD],
    [DEAD, ALIVE, DEAD],
];

function printMat(mat) {
    console.clear()
    console.log(`
    ${mat[0][0]} ${mat[1][0]} ${mat[2][0]}
    ${mat[0][1]} ${mat[1][1]} ${mat[2][1]}
    ${mat[0][2]} ${mat[1][2]} ${mat[2][2]}
    `)
}

setInterval(() => {
    mat = mat.map((row, x) => row.map((ceil, y) => getNextStepCellState(mat, [x, y])))

    printMat(mat)
}, 1000);