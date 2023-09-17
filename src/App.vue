<script setup lang="ts">
import "./styles.css";
import { startGame } from "./services/game";
import { ALIVE as A, DEAD as D, Matrix } from "./types/life";

let planner: Matrix = [
  [D, D, D, D, D],
  [D, D, A, D, D],
  [D, D, D, A, D],
  [D, A, A, A, D],
  [D, D, D, D, D],
];

const turnSignal: Matrix = [
  [D, D, D],
  [A, A, A],
  [D, D, D],
];

startGame(planner);
</script>

<template>Open console to see life game</template>
