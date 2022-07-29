import { type Choice, start_generator, next_choice } from "scheduler-wasm";

export default function generate_choices(
  mandatory: string[],
  optional: string[]
): Iterator<Choice> {
  // console.log(mandatory, optional);
  
  start_generator(mandatory, optional);
  return {
    next() {
      let v: Choice = next_choice();
      // console.log(v);
      if (v) {
        return { done: false, value: v };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}
