<script setup lang="ts">
import { ALIVE, CellState, DEAD } from "@/types";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";

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
      v-if="canEdit"
      :aria-label="state === DEAD ? 'Add cell' : 'Remove cell'"
      @click="emit('toggleState')"
      class="absolute top-0 left-0 h-full w-full flex items-center justify-center hover:bg-gray-300/30"
    >
      <PlusCircleIcon v-if="state === DEAD" class="h-1/3 text-gray-400/40" />
      <MinusCircleIcon v-else class="h-1/3 text-gray-300/40" />
    </button>
  </div>
</template>
@/types/matrix
