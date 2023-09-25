<script setup lang="ts">
import MatrixGrid from "@/components/Game/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { exampleRule2 } from "@/utils/matrices";
import { ArrowRightIcon, PlayIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const emit = defineEmits<{
  previous: [];
  next: [];
  skip: [];
}>();

const { game } = useGame();

game.value.init(exampleRule2);

const exampleShown = ref(false);
function showExample() {
  game.value.tick();
  exampleShown.value = true;
}
</script>
<template>
  <button class="absolute top-0 right-0 button-tertiary" @click="emit('skip')">
    Skip
  </button>

  <article class="w-full">
    <hgroup class="mb-4">
      <p class="text-sm mb-1 text-gray-500">Rule 2 on 3</p>
      <h1 class="text-3xl">Life of a cell</h1>
      <p>
        A black cell will remain black if <b>2 or 3</b> of the 8 cells around
        are black.
      </p>
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
        <span>Learn last rule</span>
        <ArrowRightIcon class="h-4" />
      </button>
    </div>
  </article>
</template>
