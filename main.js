const {startGame} = require("./game.js");
const {DEAD, ALIVE} = require("./life.js");


// let matrix = [
//     [DEAD, DEAD, DEAD, DEAD, DEAD],
//     [DEAD, DEAD, DEAD, DEAD, DEAD],
//     [DEAD, DEAD, ALIVE, ALIVE, ALIVE],
//     [DEAD, DEAD, ALIVE, DEAD, DEAD],
//     [DEAD, DEAD, DEAD, ALIVE, DEAD],
// ];

const matrix = [
    [DEAD, DEAD, DEAD],
    [ALIVE, ALIVE, ALIVE],
    [DEAD, DEAD, DEAD],
];

startGame(matrix);