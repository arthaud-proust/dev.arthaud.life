import { ingameTips } from "@/rules/tips/ingameTips";
import { TipsPresenter } from "@/services/tipsPresenter";
import { onMounted, ref } from "vue";

export function useIngameTipsPresenter() {
  const ingameTipsPresenter = ref<TipsPresenter>(new TipsPresenter());

  onMounted(() => {
    ingameTipsPresenter.value.load(ingameTips);
  });

  return {
    ingameTipsPresenter,
  };
}
