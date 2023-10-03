<template>
  <Dialog :open="isOpen" @close="handleClose">
    <div
      class="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20"
    >
      <DialogPanel
        class="max-w-lg w-full bg-white rounded-lg px-4 pt-8 pb-6 text-center"
      >
        <DialogTitle class="mb-4 text-lg">Want some tips?</DialogTitle>

        <div class="py-6 px-8 md:px-16 -mx-4 mb-4 overflow-hidden">
          <Swiper
            :modules="modules"
            effect="cards"
            :pagination="{ clickable: true }"
            :slides-per-view="1"
            :space-between="50"
          >
            <SwiperSlide
              v-for="tip in globalTips"
              v-slot="{ isActive }"
              :key="tip.id"
              class="shadow-md rounded-xl"
            >
              <article
                class="bg-white aspect-square md:aspect-[4/3] px-4 py-8 shadow-md border rounded-xl"
                :class="{
                  'border-gray-150': isActive,
                  'border-white': !isActive,
                }"
              >
                <h3 class="mb-4 text-xl">{{ tip.title }}</h3>
                <p class="whitespace-pre-line">{{ tip.text }}</p>
              </article>
            </SwiperSlide>
          </Swiper>
        </div>

        <button @click="handleClose" class="button mx-auto">
          Thanks, close
        </button>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { globalTips } from "@/rules/tips/globalTips";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { A11y, EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const modules = [Pagination, A11y, EffectCards];

function handleClose() {
  emit("close");
}
</script>
