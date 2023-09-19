<script setup lang="ts">
import MatrixGrid from "@/components/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { plannerCannon } from "@/utils/matrices";
import { Squares2X2Icon as Squares2X2IconOutline } from "@heroicons/vue/24/outline";
import {
  ArrowPathIcon,
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
  <MatrixGrid
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
    </template>

    <template #bottom>
      <div
        v-if="!game.hasStarted"
        class="h-10 flex items-center justify-center mt-10 md:mt-14"
      >
        <button
          @click="game.play()"
          class="flex items-center gap-2 text-white bg-black px-4 py-2 rounded"
        >
          <span>Play</span>
          <PlayIcon class="h-4" />
        </button>
      </div>
    </template>
  </MatrixGrid>

  <section class="absolute z-50 left-0 top-0 flex p-2 items-center">
    <button
      class="p-4"
      @click="game.isPlaying ? game.pause() : game.play()"
      :aria-label="game.isPlaying ? 'Pause game' : 'Play game'"
    >
      <PauseIcon v-if="game.isPlaying" class="h-4" />
      <PlayIcon v-else class="h-4" />
    </button>

    <template v-if="game.hasStarted">
      <button
        class="p-4 flex gap-2 items-center"
        @click="setNextSpeed()"
        :aria-label="
          speedIndex + 1 === speeds.length ? 'Reset speed' : 'Increase speed'
        "
      >
        <ClockIcon class="h-4" />
        <span class="text-xs">x{{ speedIndex + 1 }}</span>
      </button>

      <button
        class="p-4 flex gap-2 items-center"
        @click="game.reset()"
        :aria-label="
          speedIndex + 1 === speeds.length ? 'Reset speed' : 'Increase speed'
        "
      >
        <ArrowPathIcon class="h-4" />
      </button>
    </template>

    <template v-else>
      <button
        class="p-4"
        @click="game.killAllCells"
        aria-label="Kill all cells"
      >
        <Squares2X2IconOutline class="h-4" />
      </button>

      <button
        class="p-4"
        @click="game.bornAllCells"
        aria-label="Born all cells"
      >
        <Squares2X2IconSolid class="h-4" />
      </button>
    </template>
  </section>
</template>
