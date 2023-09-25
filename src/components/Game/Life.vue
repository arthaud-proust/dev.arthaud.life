<script setup lang="ts">
import MatrixGrid from "@/components/Game/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { plannerCannon } from "@/utils/matrices";
import { Squares2X2Icon as Squares2X2IconOutline } from "@heroicons/vue/24/outline";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
  Squares2X2Icon as Squares2X2IconSolid,
} from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";

const { game } = useGame();

const speeds = [600, 250, 50];
const speedIndex = ref(0);

watch(speedIndex, (newValue: number) => {
  game.value.setFrameInterval(speeds[newValue]);
});

function setNextSpeed() {
  speedIndex.value =
    speedIndex.value + 1 === speeds.length ? 0 : speedIndex.value + 1;
}

game.value.init(plannerCannon).setFrameInterval(speeds[0]);
</script>

<template>
  <article
    ref="container"
    class="h-screen w-screen flex justify-center overflow-hidden"
  >
    <MatrixGrid
      class="px-4"
      :matrix="game.matrix"
      :can-edit="!game.isPlaying"
      @toggle-cell-state="(cellCoords) => game.toggleCellState(cellCoords)"
    >
      <template #top>
        <div
          v-if="!game.hasStarted"
          class="h-10 flex flex-col items-center justify-center mb-10 md:mb-14"
        >
          <h1 class="text-xl">Edit cells by clicking on it. Then, play!</h1>
          <p class="text-gray-500">Tip: you can zoom on the grid.</p>
        </div>
        <div
          v-if="game.hasEnded"
          class="h-10 flex flex-col items-center justify-center mb-10 md:mb-14"
        >
          <h1 class="text-xl">Game over!</h1>
        </div>
      </template>

      <template #bottom>
        <div
          v-if="!game.hasStarted"
          class="h-10 flex items-center justify-center mt-10 md:mt-14"
        >
          <button @click="game.play()" class="button">
            <span>Start the game</span>
            <PlayIcon class="h-4" />
          </button>
        </div>
        <div
          v-if="game.hasEnded"
          class="h-10 flex items-center justify-center mt-10 md:mt-14"
        >
          <button @click="game.reset()" class="button">
            <span>Restart</span>
            <PlayIcon class="h-4" />
          </button>
        </div>
      </template>
    </MatrixGrid>
  </article>

  <section class="absolute z-50 left-0 top-0 flex p-2 items-center">
    <button
      class="button-icon"
      @click="game.isPlaying ? game.pause() : game.play()"
      :aria-label="game.isPlaying ? 'Pause game' : 'Play game'"
    >
      <PauseIcon v-if="game.isPlaying" class="h-4" />
      <PlayIcon v-else class="h-4" />
    </button>

    <template v-if="game.hasStarted">
      <button
        class="button-icon"
        @click="setNextSpeed()"
        :aria-label="
          speedIndex + 1 === speeds.length ? 'Reset speed' : 'Increase speed'
        "
      >
        <ClockIcon class="h-4" />
        <span class="text-xs">x{{ speedIndex + 1 }}</span>
      </button>

      <button class="button-icon" @click="game.reset()" aria-label="Reset game">
        <ArrowPathIcon class="h-4" />
      </button>
    </template>

    <template v-else>
      <button
        class="button-icon"
        @click="game.killAllCells"
        aria-label="Kill all cells"
      >
        <Squares2X2IconOutline class="h-4" />
      </button>

      <button
        class="button-icon"
        @click="game.bornAllCells"
        aria-label="Born all cells"
      >
        <Squares2X2IconSolid class="h-4" />
      </button>

      <button
        class="button-icon"
        :class="{ 'text-gray-400': !game.canUndo }"
        @click="game.undo"
        aria-label="Undo"
        :disabled="!game.canUndo"
      >
        <ArrowUturnLeftIcon class="h-4" />
      </button>
    </template>
  </section>
</template>
