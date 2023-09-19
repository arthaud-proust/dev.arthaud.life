<script setup lang="ts">
import Life from "@/components/Game/Life.vue";
import Tutorial from "@/components/Tutorial/Tutorial.vue";
import "@/styles.css";
import { ref } from "vue";

const showTutorial = ref(true);
</script>

<template>
  <Tutorial v-if="showTutorial" @skip="showTutorial = false" />
  <Life v-else />
</template>
