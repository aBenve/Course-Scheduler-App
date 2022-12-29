import type {
  Commissions,
  SubjectInfo,
} from "@course-scheduler-app/scheduler-wasm";
import { map, Subject as rxSubject, withLatestFrom } from "rxjs";
import courseCommissionsStore from "./CourseCommissionsStore";
import subjects from "./SubjectStore";
import { toObservable } from "./utils";

export function removeSelected(code: string) {
  subjects.update(({ mandatory, optional, ignore }) => {
    function removeFrom(group: Subject[]) {
      return group.filter((s) => s.id !== code);
    }

    [mandatory, optional, ignore] = [mandatory, optional, ignore].map(
      removeFrom
    );

    return { mandatory, optional, ignore };
  });
}

function toSubject(subject: SubjectInfo): Subject {
  return {
    id: subject.code,
    title: subject.name,
  };
}
export function addSelected(code: string, courseCommissions: Commissions) {
  const subjectInfo = courseCommissions.get_subject_info(code);
  if (subjectInfo === undefined) {
    return false;
  }
  const newSubject = toSubject(subjectInfo);
  subjects.update(({ mandatory, optional, ignore }) => {
    const newValue = {
      mandatory,
      optional: [...optional, newSubject],
      ignore,
    };
    return newValue;
  });

  return true;
}

const selected = toObservable(subjects).pipe(
  map((subjects) =>
    subjects !== null
      ? new Set(
          [...subjects.mandatory, ...subjects.optional, ...subjects.ignore].map(
            (s) => s.id
          )
        )
      : null
  )
);

const toggleSubjectObservable = new rxSubject<string>();
export function toggleSubject(code: string) {
  toggleSubjectObservable.next(code);
}

toggleSubjectObservable
  .pipe(withLatestFrom(selected), withLatestFrom(courseCommissionsStore))
  .subscribe(([[code, selected], commissions]) => {
    if (selected.has(code)) {
      removeSelected(code);
    } else {
      addSelected(code, commissions);
    }
  });

export default selected;
