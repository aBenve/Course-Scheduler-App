import { writable, type Writable } from "svelte/store";

// This is an array of Options. Every element is a object and contains subjects and week map
function createFavoriteOptions() {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        set,
        update,
        addFavoriteOption: (option) => update((options) => {
            if (options.length < 10)
                return [...options, option];
            return options;
        }),

    }
}

const favoriteOptions = createFavoriteOptions();

export default favoriteOptions;