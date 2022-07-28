import { derived, writable, type Writable } from "svelte/store";
import type { Choice } from "scheduler-wasm";
import generateChoices from "../generator";
//import subjects from "./SubjectStore";

function createOptions() {
    const { subscribe, set, update }: Writable<{generator: Iterator<Choice>, options: Choice[]}> = writable({generator: null, options: []});

    function* take<T>(iterator: Iterator<T>, length: number) {
        while (length-- > 0) yield iterator.next().value;
    }

    return {
        subscribe,
        setQuery: (mandatory: string[], optional: string[]) => set({
            generator: generateChoices(mandatory, optional), 
            options: []
        }),
        addPage: () => update(v => ({
            generator: v.generator, 
            options: v.options.concat(...take(v.generator, 4))
        }))
    }
}

const options = createOptions();
export default options;
