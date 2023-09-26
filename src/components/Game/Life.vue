<script setup lang="ts">
import MatrixGrid from "@/components/Game/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { level1 } from "@/utils/matrices";
import { Squares2X2Icon as Squares2X2IconOutline } from "@heroicons/vue/24/outline";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
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

game.value.init(level1).setFrameInterval(speeds[0]);
</script>

<template>
  <section
    ref="container"
    class="h-screen w-screen flex flex-col justify-center items-center px-4 py-20 gap-4 md:gap-6 overflow-hidden"
  >
    <article class="h-12 flex flex-col items-center justify-center text-center">
      <template v-if="!game.hasStarted">
        <h1 class="text-xl">Edit cells by clicking on it. Then, play!</h1>
        <p class="text-gray-500">Tip: you can zoom on the grid.</p>
      </template>
      <template v-if="game.hasEnded">
        <h1 class="text-xl">Game over!</h1>
      </template>
    </article>

    <MatrixGrid
      class="max-w-[65vh]"
      show-grid
      :matrix="game.matrix"
      :can-edit="!game.isPlaying && !game.hasEnded"
      :can-add-cell="game.canAddCell"
      @toggle-cell-state="(cellCoords) => game.toggleCellState(cellCoords)"
    />

    <article class="h-12 flex items-center justify-center text-center">
      <template v-if="!game.hasStarted">
        <button @click="game.play()" class="button">
          <span>Start the game</span>
          <PlayIcon class="h-4" />
        </button>
      </template>
      <template v-if="game.hasEnded">
        <button @click="game.reset()" class="button">
          <span>Restart</span>
          <PlayIcon class="h-4" />
        </button>
      </template>
    </article>
  </section>

  <section
    class="absolute z-50 h-16 w-screen left-0 top-0 flex p-2 items-center"
  >
    <div v-if="!game.hasEnded" class="flex items-center">
      <button
        class="button-icon"
        @click="game.isPlaying ? game.pause() : game.play()"
        v-tooltip="game.isPlaying ? 'Pause game' : 'Play game'"
        :aria-label="game.isPlaying ? 'Pause game' : 'Play game'"
      >
        <PauseIcon v-if="game.isPlaying" class="h-4" />
        <PlayIcon v-else class="h-4" />
      </button>

      <template v-if="game.isPlaying">
        <button
          class="button-icon"
          @click="setNextSpeed()"
          v-tooltip="
            speedIndex + 1 === speeds.length ? 'Reset speed' : 'Increase speed'
          "
          :aria-label="
            speedIndex + 1 === speeds.length ? 'Reset speed' : 'Increase speed'
          "
        >
          <ClockIcon class="h-4" />
          <span class="text-xs">x{{ speedIndex + 1 }}</span>
        </button>

        <button
          class="button-icon"
          @click="game.reset()"
          v-tooltip="'Reset game'"
          aria-label="Reset game"
        >
          <ArrowPathIcon class="h-4" />
        </button>
      </template>

      <template v-else>
        <button
          class="button-icon"
          @click="game.removeAllCells"
          v-tooltip="'Remove all cells'"
          aria-label="Remove all cells"
        >
          <Squares2X2IconOutline class="h-4" />
        </button>

        <button
          class="button-icon"
          :class="{ 'text-gray-400': !game.canUndo }"
          @click="game.undo"
          v-tooltip="'Undo'"
          aria-label="Undo"
          :disabled="!game.canUndo"
        >
          <ArrowUturnLeftIcon class="h-4" />
        </button>
      </template>
    </div>

    <div class="flex items-center ml-auto">
      <button
        v-tooltip="game.cellsStock + ' cells in stock'"
        class="button-icon h-8 rounded"
        :class="{ 'text-red-800 bg-red-100': game.cellsStock <= 0 }"
      >
        <StopIcon class="h-4" />
        <span class="text-xs">{{ game.cellsStock }}</span>
      </button>

      <button class="button-icon" v-tooltip="game.turnsCount + ' turns past'">
        <CalendarDaysIcon class="h-4" />
        <span class="text-xs w-10">{{ game.turnsCount }}</span>
      </button>
    </div>
  </section>
</template>
