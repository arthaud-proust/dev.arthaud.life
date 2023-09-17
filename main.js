const {startGame} = require("./game.js");
const {DEAD: D, ALIVE: A} = require("./life.js");


let planner = [
    [D, D, D, D, D],
    [D, D, A, D, D],
    [D, D, D, A, D],
    [D, A, A, A, D],
    [D, D, D, D, D],
];

const turnSignal = [
    [D, D, D],
    [A, A, A],
    [D, D, D],
];

startGame(planner);