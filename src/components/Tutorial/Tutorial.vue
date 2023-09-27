<script setup lang="ts">
import Step1 from "@/components/Tutorial/Steps/Step1.vue";
import Step2 from "@/components/Tutorial/Steps/Step2.vue";
import Step3 from "@/components/Tutorial/Steps/Step3.vue";
import { ref } from "vue";

const emit = defineEmits<{
  showGame: [];
  showIntro: [];
}>();

const step = ref(1);
</script>
<template>
  <section class="h-screen flex flex-col items-center p-4">
    <div class="relative max-w-sm w-full h-full flex flex-col justify-center">
      <Step1
        v-if="step === 1"
        @previous="emit('showIntro')"
        @next="step++"
        @skip="emit('showGame')"
      />
      <Step2
        v-if="step === 2"
        @previous="step--"
        @next="step++"
        @skip="emit('showGame')"
      />
      <Step3
        v-if="step === 3"
        @previous="step--"
        @next="emit('showGame')"
        @skip="emit('showGame')"
      />
    </div>
  </section>
</template>
