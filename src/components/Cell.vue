<script setup lang="ts">
import { ALIVE, CellState } from "../types/life";

defineProps<{
  state: CellState;
}>();
</script>

<template>
  <div
    class="aspect-square w-full"
    :class="state === ALIVE ? 'bg-black' : 'bg-white'"
  ></div>
</template>
