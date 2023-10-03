<script setup lang="ts">
import MatrixGrid from "@/components/Game/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { TURNS_LIMIT } from "@/services/game";
import { getMatrixSize, level1 } from "@/utils/matrices";
import { Squares2X2Icon as Squares2X2IconOutline } from "@heroicons/vue/24/outline";
import {
  AcademicCapIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  LightBulbIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
  TrophyIcon,
} from "@heroicons/vue/24/solid";
import { onMounted, ref, watch } from "vue";
import GlobalTipsModal from "../Tip/GlobalTipsModal.vue";
import IngameTipsModal from "../Tip/IngameTipsModal.vue";

const emit = defineEmits<{
  showTutorial: [];
}>();

const { game } = useGame();

const speeds = [600, 250, 50];
const speedIndex = ref(0);
const isGlobalTipsModalOpen = ref(false);

watch(speedIndex, (newValue: number) => {
  game.value.setFrameInterval(speeds[newValue]);
});

function setNextSpeed() {
  speedIndex.value =
    speedIndex.value + 1 === speeds.length ? 0 : speedIndex.value + 1;
}

onMounted(() => {
  game.value.init(level1).setFrameInterval(speeds[0]);
});
</script>

<template>
  <section
    class="absolute z-50 h-16 w-screen left-0 top-4 flex p-2 gap-2 items-center justify-between md:justify-evenly"
  >
    <div class="flex gap-2 items-center">
      <button
        class="button-icon"
        @click="emit('showTutorial')"
        v-tooltip="'Show tutorial'"
        aria-label="Show tutorial"
      >
        <AcademicCapIcon class="h-5" />
      </button>

      <button
        class="button-icon"
        @click="isGlobalTipsModalOpen = true"
        v-tooltip="'Show tips'"
        aria-label="Show tips"
      >
        <LightBulbIcon class="h-5" />
      </button>
    </div>

    <div class="flex gap-2 items-center">
      <p
        v-tooltip="game.cellsStock + ' cells in stock'"
        class="tag-icon"
        :class="{ 'text-red-800 bg-red-100': game.cellsStock <= 0 }"
      >
        <StopIcon class="h-5" />
        <span class="text-xs">{{ game.cellsStock }}</span>
        <span class="sr-only"> cells in stock</span>
      </p>

      <p
        class="tag-icon"
        v-tooltip="game.turnsCount + ' turns past'"
        :class="{
          'text-orange-800 bg-orange-100': game.turnsCount >= TURNS_LIMIT * 0.6,
          'text-red-800 bg-red-100': game.turnsCount >= TURNS_LIMIT * 0.9,
        }"
      >
        <CalendarDaysIcon class="h-5" />
        <span class="text-xs">{{ game.turnsCount }}</span>
        <span class="sr-only"> turns past</span>
      </p>

      <p v-tooltip="'Score: ' + game.cellsStock" class="tag-icon">
        <TrophyIcon class="h-5" />
        <span class="sr-only">Score: </span>
        <span class="text-xs">{{ game.score.global }}</span>
      </p>
    </div>
  </section>

  <section
    ref="container"
    class="h-screen w-screen flex flex-col justify-center items-center px-4 py-20 gap-4 md:gap-6 overflow-hidden"
  >
    <article class="h-12 flex flex-col items-center justify-center text-center">
      <template v-if="game.hasEnded">
        <h1 class="text-xl">Game over!</h1>
        <p class="text-gray-500">You made a score of {{ game.score.global }}</p>
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
      <template v-if="game.hasEnded">
        <button @click="game.reset()" class="button">
          <span>Restart</span>
          <PlayIcon class="h-5" />
        </button>
      </template>
    </article>
  </section>

  <section
    v-if="!game.hasEnded"
    class="absolute z-50 h-16 w-screen left-0 bottom-4 flex p-2 items-center justify-center"
  >
    <button
      class="button-icon"
      @click="game.isPlaying ? game.pause() : game.play()"
      v-tooltip="game.isPlaying ? 'Pause game' : 'Play game'"
      :aria-label="game.isPlaying ? 'Pause game' : 'Play game'"
    >
      <PauseIcon v-if="game.isPlaying" class="h-5" />
      <PlayIcon v-else class="h-5" />
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
        <ClockIcon class="h-5" />
        <span class="text-xs">x{{ speedIndex + 1 }}</span>
      </button>

      <button
        class="button-icon"
        @click="game.reset()"
        v-tooltip="'Reset game'"
        aria-label="Reset game"
      >
        <ArrowPathIcon class="h-5" />
      </button>
    </template>

    <template v-else>
      <button
        class="button-icon"
        @click="game.removeAllCells"
        v-tooltip="'Remove all cells'"
        aria-label="Remove all cells"
      >
        <Squares2X2IconOutline class="h-5" />
      </button>

      <button
        class="button-icon"
        :class="{ 'text-gray-400': !game.canUndo }"
        @click="game.undo"
        v-tooltip="'Undo'"
        aria-label="Undo"
        :disabled="!game.canUndo"
      >
        <ArrowUturnLeftIcon class="h-5" />
      </button>
    </template>
  </section>

  <IngameTipsModal
    :cells-stock="game.cellsStock"
    :score="game.score.global"
    :matrix-size="getMatrixSize(game.matrix)"
    :turns="game.turnsCount"
    @show-popup="game.pause()"
  />
  <GlobalTipsModal
    :is-open="isGlobalTipsModalOpen"
    @close="isGlobalTipsModalOpen = false"
  />
</template>
