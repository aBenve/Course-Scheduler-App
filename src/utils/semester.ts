import { Semester } from "@course-scheduler-app/scheduler-wasm";

export function semesterToString(semester: Semester) {
  switch (semester) {
    case Semester.First:
      return "First";
    case Semester.Second:
      return "Second";
  }
}
