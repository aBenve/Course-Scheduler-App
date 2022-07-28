import { type Choice, start_generator, next_choice } from "scheduler-wasm";

export default function generate_choices(
  mandatory: string[],
  optional: string[]
): Iterator<Choice> {
  start_generator(mandatory, optional);
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
}
