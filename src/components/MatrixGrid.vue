<script setup lang="ts">
import Cell from "@/components/Cell.vue";
import { CellCoords, Matrix } from "@/types";
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";

defineProps<{
  matrix: Matrix;
  canEdit: boolean;
}>();

const container = ref();
const containerSize = useElementSize(container);

const emit = defineEmits<{
  toggleCellState: [cellCoords: CellCoords];
}>();
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
          :can-edit="canEdit"
          :state="cellState"
          @toggle-state="() => emit('toggleCellState', [x, y])"
        />
      </div>
    </div>
  </article>
</template>
@/types/matrix
