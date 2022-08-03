import { derived, writable, type Writable } from "svelte/store";
import type { Choice } from "scheduler-wasm";
import generateChoices from "../generator";
import subjects from "./SubjectStore";

export type QueryParameters = {
  mandatory: string[];
  optional: string[];
  min_credit_count?: number;
  max_credit_count?: number;
  min_subject_count?: number;
  max_subject_count?: number;
};

function createOptions() {
  const {
    subscribe,
    set,
    update,
  }: Writable<{
    generator: Iterator<Choice>;
    parameters: QueryParameters;
    options: Choice[];
    sortedSubjects: string[];
  }> = writable({
    parameters: { mandatory: [], optional: [] },
    generator: null,
    options: [],
    sortedSubjects: [],
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
    setQuery: (parameters: QueryParameters) =>
      set({
        generator: generateChoices(parameters),
        parameters: parameters,
        sortedSubjects: [...parameters.mandatory, ...parameters.optional],
        options: [],
      }),
    addPage: () =>
      update((v) => ({
        generator: v.generator,
        parameters: v.parameters,
        options: v.options.concat(...take(v.generator, 10)),
        sortedSubjects: v.sortedSubjects,
      })),
  };
}

const options = createOptions();

export default options;
