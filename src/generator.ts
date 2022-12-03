import type { Choice, Commissions } from "@course-scheduler-app/scheduler-wasm";
import type { QueryParameters } from "./store/OptionStore";

export default function generate_choices(
  courseCommissions: Commissions,
  {
    mandatory,
    optional,
    min_credit_count,
    max_credit_count,
    min_subject_count,
    max_subject_count,
  }: QueryParameters
): { iterator: Iterator<Choice>; free: () => void } {
  //console.log("Generator called!");
  // console.log(mandatory, optional);

  if (min_subject_count < 1) {
    min_subject_count = 1;
  }

  let builder = courseCommissions
    .create_generator_builder()
    .set_mandatory_codes(mandatory)
    .set_optional_codes(optional)
    .set_collision_exceptions([])
    .set_min_credit_count(min_credit_count)
    .set_max_credit_count(max_credit_count)
    .set_min_subject_count(min_subject_count)
    .set_max_subject_count(max_subject_count);

  //console.log(builder);

  let iter = builder.build();

  return {
    iterator: {
      next() {
        let v: Choice = iter.next_choice();
        // console.log(v);
        if (v) {
          return { done: false, value: v };
        } else {
          return { done: true, value: undefined };
        }
      },
    },
    free: iter.free.bind(iter),
  };
}
