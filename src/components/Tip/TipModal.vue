<template>
  <Dialog :open="isOpen" @close="handleRead">
    <div
      class="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20"
    >
      <DialogPanel
        class="max-w-lg w-full bg-white rounded-lg px-4 pt-8 pb-6 text-center"
      >
        <DialogTitle class="mb-4 text-xl">{{
          displayedTip?.title ?? "Learn a tip!"
        }}</DialogTitle>
        <DialogDescription class="mb-4">
          {{ displayedTip?.text ?? "Lorem ipsum dolor sit amet." }}
        </DialogDescription>

        <button @click="handleRead" class="button mx-auto">Ok, close</button>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useTipsPresenter } from "@/composables/tipsPresenter";
import { Tip, TipRulesInput } from "@/types/tip";
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ref, watch } from "vue";

const props = defineProps<TipRulesInput>();
const emit = defineEmits<{
  showPopup: [];
}>();

const isOpen = ref(false);
const { tipsPresenter } = useTipsPresenter();

const displayedTip = ref<Tip>();

watch(
  () => tipsPresenter.value.tipsToDisplay(props),
  (value) => {
    if (value.length) {
      displayedTip.value = value[0];
      openPopup();
    }
  },
);

function openPopup() {
  emit("showPopup");
  isOpen.value = true;
}

function handleRead() {
  if (displayedTip.value) {
    tipsPresenter.value.readTip(displayedTip.value.id);
  }
  isOpen.value = false;
}
</script>
