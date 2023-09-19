<script setup lang="ts">
import Cell from "@/components/Game/Cell.vue";
import { CellCoords, Matrix } from "@/types";
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";

defineProps<{
  matrix: Matrix;
  canEdit?: boolean;
  showGrid?: boolean;
  cellsTransition?: boolean;
}>();

const container = ref();
const containerSize = useElementSize(container);

const emit = defineEmits<{
  toggleCellState: [cellCoords: CellCoords];
}>();
</script>

<template>
  <div
    class="aspect-square flex flex-col justify-center"
    :class="
      containerSize.height.value < containerSize.width.value
        ? 'h-full'
        : 'w-full'
    "
  >
    <slot name="top"></slot>

    <div
      class="flex flex-col justify-center"
      :class="{ 'bg-black gap-px': showGrid }"
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

    <slot name="bottom"></slot>
  </div>
</template>
@/types/matrix
