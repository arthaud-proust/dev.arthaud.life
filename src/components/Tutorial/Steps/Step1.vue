<script setup lang="ts">
import { version } from "@/../package.json";
import MatrixGrid from "@/components/Game/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { planner } from "@/utils/matrices";

const emit = defineEmits<{
  previous: [];
  next: [];
  skip: [];
}>();

const { game } = useGame();

game.value.init(planner);
</script>
<template>
  <article class="w-full">
    <hgroup class="mb-4">
      <p class="text-sm mb-1 text-gray-500">
        <a
          class="underline"
          href="https://github.com/arthaud-proust/dev.arthaud.life/releases"
          target="_blank"
          rel="noopener"
          >v{{ version }}</a
        >
      </p>
      <h1 class="text-3xl">Life</h1>
      <p>A replica of the "Game of life" invented by John Horton Conway</p>
    </hgroup>

    <MatrixGrid class="mb-4" show-grid :matrix="game.matrix" />

    <div class="flex gap-4">
      <button class="button" @click="emit('next')">Discover</button>
      <button class="button-secondary" @click="emit('skip')">
        Play directly
      </button>
    </div>
  </article>
</template>
