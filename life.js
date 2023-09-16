const DEAD = 0;
const ALIVE = 1;

const ALIVE_NEIGHBORS_CELLS_COUNT_TO_BORN = 3;
const ALIVE_NEIGHBORS_CELLS_COUNT_TO_LIVE = [2, 3];


function getNextStepCellState(mat, [x, y]) {
    const ceilState = getCellState(mat, [x, y]);
    const neighborsCellStates = getNeighborsCellStates(mat, [x, y]);

    const aliveNeighborsCells = neighborsCellStates.filter(ceilState => ceilState === ALIVE).length;

    if (
        ceilState === DEAD
        && aliveNeighborsCells === ALIVE_NEIGHBORS_CELLS_COUNT_TO_BORN
    ) {
        return ALIVE;
    }

    if (
        ceilState === ALIVE
        && ALIVE_NEIGHBORS_CELLS_COUNT_TO_LIVE.includes(aliveNeighborsCells)
    ) {
        return ALIVE;
    }

    return DEAD;
}

function getNeighborsCellStates(mat, [x, y]) {
    const topLeft = getCellState(mat, [x - 1, y - 1]);
    const topCenter = getCellState(mat, [x, y - 1]);
    const topRight = getCellState(mat, [x + 1, y - 1]);

    const midLeft = getCellState(mat, [x - 1, y]);
    const midRight = getCellState(mat, [x + 1, y]);

    const bottomLeft = getCellState(mat, [x - 1, y + 1]);
    const bottomCenter = getCellState(mat, [x, y + 1]);
    const bottomRight = getCellState(mat, [x + 1, y + 1]);

    return [
        topLeft,
        topCenter,
        topRight,
        midLeft,
        midRight,
        bottomLeft,
        bottomCenter,
        bottomRight
    ];
}

function getCellState(mat, [x, y]) {
    return mat[x]?.[y] ?? DEAD;
}

module.exports = {
    ALIVE,
    DEAD,
    getNextStepCellState
}