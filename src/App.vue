<script setup lang="ts">
import Life from "@/components/Game/Life.vue";
import Introduction from "@/components/Introduction.vue";
import Tutorial from "@/components/Tutorial/Tutorial.vue";
import "@/styles.css";
import { ref } from "vue";

const showSection = ref<"intro" | "tuto" | "game">("intro");
</script>

<template>
  <Introduction
    v-if="showSection === 'intro'"
    @show-game="showSection = 'game'"
    @show-tuto="showSection = 'tuto'"
  />
  <Tutorial
    v-if="showSection === 'tuto'"
    @show-intro="showSection = 'intro'"
    @show-game="showSection = 'game'"
  />
  <Life
    v-else
    v-if="showSection === 'game'"
    @show-tutorial="showSection = 'tuto'"
  />
</template>
