import type {
  Commissions,
  SubjectInfo,
  SubjectPlan
} from "@course-scheduler-app/scheduler-wasm";
import {
  loadSelectedSubjectCategorization,
  saveSelectedSubjectCategorization
} from "src/storage";
import { writable, type Writable } from "svelte/store";
import courseCommissionsStore from "./CourseCommissionsStore";
import finalizedSubjectsStore from "./FinalizedSubjectsStore";
import planStore from "./PlanStore";
//import { SubjectInfo } from "scheduler-wasm";

export type SubjectCategorization = {
  mandatory: Subject[];
  optional: Subject[];
  ignore: Subject[];
};

// llamado a la api
const subjects: Writable<SubjectCategorization> = writable(null);

export function load(plan: SubjectPlan) {
  function getSubjectInfo(code: string): SubjectInfo {
    return plan.get_subject_info(code);
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

  finalizedSubjectsStore.set(value);
}

planStore.subscribe((subjectPlan) => {
  if (subjectPlan === null) return;
  load(subjectPlan);
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
