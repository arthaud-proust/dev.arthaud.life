<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";
import { Matrix } from "../types/life";
import Cell from "./Cell.vue";

defineProps<{
  matrix: Matrix;
}>();

const container = ref();
const containerSize = useElementSize(container);
</script>

<template>
  <article
    ref="container"
    class="h-screen w-screen flex justify-center overflow-hidden"
  >
    <div
      class="aspect-square flex flex-col justify-center"
      :class="
        containerSize.height.value < containerSize.width.value
          ? 'h-full'
          : 'w-full'
      "
    >
      <div class="flex" v-for="(row, y) in matrix" :key="`${y}`">
        <Cell
          v-for="(cellState, x) in row"
          :key="`${x}-${y}`"
          :state="cellState"
        />
      </div>
    </div>
  </article>
</template>
