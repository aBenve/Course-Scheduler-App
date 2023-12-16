import type {
  Commissions,
  SubjectInfo,
  SubjectPlan,
} from "@course-scheduler-app/scheduler-wasm";
import { combineLatestWith } from "rxjs";
import {
  loadSelectedSubjectCategorization,
  saveSelectedSubjectCategorization,
} from "src/storage";
import { writable, type Writable } from "svelte/store";
import courseCommissionsStore from "./CourseCommissionsStore";
import planStore from "./PlanStore";
//import { SubjectInfo } from "scheduler-wasm";

export type SubjectCategorization = {
  mandatory: Subject[];
  optional: Subject[];
  ignore: Subject[];
};

// llamado a la api
const subjects: Writable<SubjectCategorization> = writable(null);

export function load(plan: SubjectPlan, courseCommissions: Commissions) {
  function getSubjectInfo(code: string): SubjectInfo {
    return courseCommissions.get_subject_info(code) && plan.get_subject_info(code);
  }

  function to_subject(subject: SubjectInfo): Subject {
    return {
      id: subject.code,
      title: subject.name,
    };
  }

  const { mandatory, optional, ignore } = loadSelectedSubjectCategorization();
  let [mandatory_subjects, optional_subjects, ignore_subjects] = [
    mandatory,
    optional,
    ignore,
  ].map((s) =>
    s
      .map(getSubjectInfo)
      .filter((s) => s !== undefined)
      .map(to_subject)
  );

  let value = {
    mandatory: mandatory_subjects,
    optional: optional_subjects,
    ignore: ignore_subjects,
  };

  subjects.set(value);
}

planStore
  .pipe(combineLatestWith(courseCommissionsStore))
  .subscribe(([subjectPlan, courseCommissions]) => {
    if (subjectPlan && courseCommissions) {
      load(subjectPlan, courseCommissions);
    } else {
      subjects.set(null);
    }
  });

subjects.subscribe((subjects) => {
  if (subjects == null) {
    return;
  }
  function getCodes(subjects: Subject[]) {
    return subjects.map((s) => s.id);
  }

  let [mandatory, optional, ignore] = [
    subjects.mandatory,
    subjects.optional,
    subjects.ignore,
  ].map(getCodes);
  saveSelectedSubjectCategorization(mandatory, optional, ignore);
});

export default subjects;
