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
    free: () => void;
    isComplete: boolean;
    parameters: QueryParameters;
    options: Choice[];
    sortedSubjects: string[];
  }> = writable({
    parameters: { mandatory: [], optional: [] },
    free: null,
    isComplete: true,
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
    setQuery: (parameters: QueryParameters) => {
      update((v) => {
        if (v.free) {
          try {
            v.free();
          } catch {}
        }
        let { iterator: generator, free } = generateChoices(parameters);
        return {
          generator,
          free,
          isComplete: false,
          parameters: parameters,
          sortedSubjects: [...parameters.mandatory, ...parameters.optional],
          options: [],
        };
      });
    },
    addPage: () =>
      update((v) => {
        let count = 10;
        let toAdd = [...take(v.generator, count)];
        return {
          generator: v.generator,
          free: v.free,
          isComplete: toAdd.length < count,
          parameters: v.parameters,
          options: v.options.concat(...toAdd),
          sortedSubjects: v.sortedSubjects,
        };
      }),
  };
}

const options = createOptions();

export default options;
