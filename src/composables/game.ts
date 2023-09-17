import { Game } from "@/services/game";
import { ref } from "vue";

export function useGame() {
  const game = ref(new Game());

  return {
    game,
  };
}
