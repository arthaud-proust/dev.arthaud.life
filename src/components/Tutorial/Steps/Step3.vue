<script setup lang="ts">
import MatrixGrid from "@/components/Game/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { exampleRule3 } from "@/utils/matrices";
import { PlayIcon, SparklesIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const emit = defineEmits<{
  previous: [];
  next: [];
  skip: [];
}>();

const { game } = useGame();

game.value.init(exampleRule3);

const exampleShown = ref(false);
function showExample() {
  game.value.tick();
  exampleShown.value = true;
}
</script>
<template>
  <button class="absolute top-0 right-0 button-tertiary" @click="emit('skip')">
    Go to game
  </button>

  <article class="w-full">
    <hgroup class="mb-4">
      <p class="text-sm mb-1 text-gray-500">Rule 3 on 3</p>
      <h1 class="text-3xl">Death of a cell</h1>
      <p>If less than 2 or more than 3 cells around, cell will became white.</p>
    </hgroup>

    <MatrixGrid class="mb-4" show-grid :matrix="game.matrix" cells-transition />

    <div class="flex justify-between">
      <button class="button-tertiary" @click="emit('previous')">
        Previous
      </button>

      <button v-if="!exampleShown" class="button" @click="showExample">
        <span>Show me</span>
        <PlayIcon class="h-4" />
      </button>
      <button v-else class="button" @click="emit('next')">
        <span>I'm ready to play</span>
        <SparklesIcon class="h-4" />
      </button>
    </div>
  </article>
</template>
