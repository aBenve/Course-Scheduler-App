import { Semester } from "@course-scheduler-app/scheduler-wasm";
import { writable, type Writable } from "svelte/store";

const selectedTerm: Writable<{ year: number; semester: Semester }> = writable({
  year: 2024,
  semester: Semester.First,
});

export default selectedTerm;
