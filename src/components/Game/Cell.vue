<script setup lang="ts">
import { ALIVE, CellState, DEAD } from "@/types";

defineProps<{
  state: CellState;
  canEdit?: boolean;
  transition?: boolean;
}>();

const emit = defineEmits<{
  toggleState: [];
}>();
</script>

<template>
  <div
    class="relative aspect-square w-full"
    :class="{
      'bg-white': state === DEAD,
      'bg-black': state === ALIVE,
      'transition-colors duration-700': transition,
    }"
  >
    <button
      v-show="canEdit"
      @click="emit('toggleState')"
      class="absolute top-0 left-0 h-full w-full hover:bg-gray-300/30"
    ></button>
    <div
      v-show="canEdit"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/3 pointer-events-none aspect-square rounded-full bg-gray-300/30"
    ></div>
  </div>
</template>
@/types/matrix
