<script setup lang="ts">
import Cell from "@/components/Game/Cell.vue";
import { CellCoords, Matrix } from "@/types";

defineProps<{
  matrix: Matrix;
  canEdit?: boolean;
  showGrid?: boolean;
  cellsTransition?: boolean;
}>();

const emit = defineEmits<{
  toggleCellState: [cellCoords: CellCoords];
}>();
</script>

<template>
  <article class="aspect-square w-full">
    <div
      class="flex flex-col justify-center w-full"
      :class="[showGrid ? 'bg-black gap-px' : '', ,]"
    >
      <div
        class="flex"
        :class="{ 'gap-px': showGrid }"
        v-for="(row, y) in matrix"
        :key="`${y}`"
      >
        <Cell
          v-for="(cellState, x) in row"
          :key="`${x}-${y}`"
          :can-edit="canEdit"
          :state="cellState"
          :transition="cellsTransition"
          @toggle-state="() => emit('toggleCellState', [x, y])"
        />
      </div>
    </div>
  </article>
</template>
@/types/matrix
