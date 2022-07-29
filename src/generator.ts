import { type Choice, start_generator, next_choice } from "scheduler-wasm";
import type { QueryParameters } from "./store/OptionStore";

export default function generate_choices({
  mandatory,
  optional,
  min_credit_count,
  max_credit_count,
  min_subject_count,
  max_subject_count,
}: QueryParameters): Iterator<Choice> {
  // console.log(mandatory, optional);

  start_generator(
    mandatory,
    optional,
    [
      [
        ["72.37", "S"],
        ["72.07", "S"],
      ],
    ],
    min_credit_count,
    max_credit_count,
    min_subject_count,
    max_subject_count
  );
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
