import { derived, writable, type Writable } from "svelte/store";
import type { Choice } from "scheduler-wasm";
import generateChoices from "../generator";
import subjects from "./SubjectStore";

function createOptions() {
  const {
    subscribe,
    set,
    update,
  }: Writable<{
    generator: Iterator<Choice>;
    parameters: { mandatory: string[]; optional: string[] };
    options: Choice[];
  }> = writable({
    parameters: { mandatory: [], optional: [] },
    generator: null,
    options: [],
  });

  function* take<T>(iterator: Iterator<T>, length: number) {
    while (length-- > 0) {
      let next = iterator.next();
      if (next.done) break;
      yield next.value;
    }
  }

  return {
    subscribe,
    setQuery: (mandatory: string[], optional: string[]) =>
      set({
        generator: generateChoices(mandatory, optional),
        parameters: { mandatory, optional },
        options: [],
      }),
    addPage: () =>
      update((v) => ({
        generator: v.generator,
        parameters: v.parameters,
        options: v.options.concat(...take(v.generator, 10)),
      })),
  };
}

const options = createOptions();

export default options;
