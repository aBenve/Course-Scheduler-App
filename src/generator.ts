import { start_generator, next_choice } from "scheduler-wasm";
import type { Choice } from "scheduler-wasm";

export default function generate_choices(
  mandatory: string[],
  optional: string[]
): Iterable<Choice> {
  start_generator(mandatory, optional);
  return {
    [Symbol.iterator]: function () {
      return {
        next() {
          let v: Choice = next_choice();
          if (v) {
            return { done: false, value: v };
          } else {
            return { done: true, value: undefined };
          }
        },
      };
    },
  };
}
