import type { Choice } from "@course-scheduler-app/scheduler-wasm";
import { writable } from "svelte/store";

// This is an array of Options.
function createFavoriteOptions() {
  const { subscribe, set, update } = writable<Choice[]>([]);
  return {
    subscribe,
    set,
    update,
    addFavoriteOption: (option: Choice) =>
      update((options) => {
        if (options.length < 10) return [...options, option];
        return options;
      }),
  };
}

const favoriteOptions = createFavoriteOptions();

export default favoriteOptions;
