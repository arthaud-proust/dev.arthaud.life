<script setup lang="ts">
import MatrixGrid from "@/components/MatrixGrid.vue";
import { useGame } from "@/composables/game";
import { plannerCannon } from "@/utils/matrices";
import { computed, ref } from "vue";

const { game } = useGame();

game.value.start(plannerCannon);

const gameFrameInterval = computed({
  get() {
    return game.value.frameMsInterval;
  },
  set(value: number) {
    game.value.setFrameInterval(value);
  },
});

const isMenuOpen = ref<boolean>(false);
</script>

<template>
  <MatrixGrid
    :matrix="game.matrix"
    :can-edit="!game.isPlaying"
    @toggle-cell-state="(cellCoords) => game.toggleCellState(cellCoords)"
  />
  <section
    class="absolute z-50 left-0 top-0 flex flex-col gap-2 p-2 items-start bg-white"
  >
    <button @click="isMenuOpen = !isMenuOpen" class="px-4 py-2">
      {{ isMenuOpen ? "Close menu" : "Open menu" }}
    </button>

    <div v-show="isMenuOpen" class="flex flex-col gap-4 p-2 items-start">
      <button
        class="px-4 py-2 border border-black"
        @click="game.isPlaying ? game.pause() : game.play()"
      >
        {{ game.isPlaying ? "Pause" : "Play" }}
      </button>

      <div v-show="!game.isPlaying" class="flex flex-col gap-2">
        <span>Cells edition</span>
        <button
          class="px-4 py-2 border border-black"
          @click="game.killAllCells"
        >
          Kill all
        </button>
        <button
          class="px-4 py-2 border border-black"
          @click="game.bornAllCells"
        >
          Born all
        </button>
      </div>

      <label class="flex flex-col gap-2">
        <span>Frame interval (ms)</span>
        <input
          class="w-auto px-4 py-2 border border-black"
          type="number"
          v-model.number="gameFrameInterval"
        />
      </label>
    </div>
  </section>
</template>
