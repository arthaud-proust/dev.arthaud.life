import { tips } from "@/rules/tips";
import { TipsPresenter } from "@/services/tipsPresenter";
import { onMounted, ref } from "vue";

export function useTipsPresenter() {
  const tipsPresenter = ref<TipsPresenter>(new TipsPresenter());

  onMounted(() => {
    tipsPresenter.value.load(tips);
  });

  return {
    tipsPresenter,
  };
}
