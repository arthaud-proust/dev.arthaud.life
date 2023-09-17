<script setup lang="ts">
import { ALIVE, CellState } from "@/types/life";

defineProps<{
  state: CellState;
  canEdit: boolean;
}>();

const emit = defineEmits<{
  toggleState: [];
}>();
</script>

<template>
  <div
    class="relative aspect-square w-full"
    :class="state === ALIVE ? 'bg-black' : 'bg-white'"
  >
    <button
      v-show="canEdit"
      @click="emit('toggleState')"
      class="absolute inset-0"
    ></button>
    <div
      v-show="canEdit"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/3 pointer-events-none aspect-square rounded-full bg-gray-300/30"
    ></div>
  </div>
</template>
