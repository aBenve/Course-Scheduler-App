import type { Choice } from "@course-scheduler-app/scheduler-wasm";
import {
  combineLatestWith,
  finalize,
  map,
  Observable,
  scan,
  share,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
  zip,
} from "rxjs";
import generateChoices from "../generator";
import courseCommissionsStore from "./CourseCommissionsStore";
import finalizedSubjects from "./FinalizedSubjectsStore";
import { resetSelectedOption } from "./SelectedOptionIndices";
import settings from "./UserSettingsStore";
import { debug, toObservable } from "./utils";

export type QueryParameters = {
  mandatory: string[];
  optional: string[];
  min_credit_count?: number;
  max_credit_count?: number;
  min_subject_count?: number;
  max_subject_count?: number;
};

function* take<T>(iterator: Iterator<T>, length: number): Generator<T> {
  let i = 0;
  for (let x of { [Symbol.iterator]: () => iterator }) {
    yield x;
    if (++i === length) break;
  }
}

let addPageObservable = new Subject();

//addPageObservable.subscribe(() =>
//console.log("Add page called!", addPageObservable.observers)
//);

export function addPage() {
  addPageObservable.next(undefined);
}

function createOptions() {
  let subjects = toObservable(finalizedSubjects)
    .pipe
    //debug("Subjects!"),
    //shareReplay()
    ();
  let querySettings = toObservable(settings)
    .pipe
    //debug("Settings!"),
    //shareReplay()
    ();
  let combinedParameters = subjects.pipe(
    combineLatestWith(querySettings)
    //debug("Combined params")
    //share(),
  );
  let queryParameters = combinedParameters.pipe(
    map(
      ([subjects, querySettings]) =>
        ({
          mandatory: subjects.mandatory.map((s) => s.id),
          optional: subjects.optional.map((s) => s.id),
          min_subject_count: querySettings.min_subjects,
          min_credit_count: querySettings.min_credits,
          max_subject_count: querySettings.max_subjects,
          max_credit_count: querySettings.max_credits,
        } as QueryParameters)
    ),
    //debug("Query params"),
    share()
  );

  let generator = queryParameters.pipe(
    withLatestFrom(courseCommissionsStore),
    map(([a, s]) => generateChoices(s, a))
    //debug("Created Generator!"),
  );

  let optionsHigherOrder = generator.pipe(
    tap({ next: () => resetSelectedOption() }),
    map((gen) =>
      addPageObservable.pipe(
        startWith(null),
        map((_) => [...take(gen.iterator, 10)]),
        map((v) => ({ values: v, done: v.length == 0 })),
        startWith({ values: [] as Choice[], done: false }),
        takeUntil(generator),
        scan((a, v) => ({
          values: [...a.values, ...v.values],
          done: a.done || v.done,
        })),
        finalize(() => gen.free())
      )
    )
    //debug("Generator!"),
  );

  let options: Observable<{
    values: Choice[];
    sortedSubjects: string[];
    done: boolean;
  }> = zip(
    optionsHigherOrder,
    combinedParameters.pipe(map(([s, _q]) => s))
  ).pipe(
    switchMap(([options, subjects]) => {
      let sortedSubjects = [...subjects.mandatory, ...subjects.optional].map(
        (s) => s.id
      );
      return options.pipe(map((options) => ({ sortedSubjects, ...options })));
    }),
    startWith({ sortedSubjects: [], values: [], done: false }),
    shareReplay(1)
  );

  let newSearch = combinedParameters
    .pipe
    //debug("New Search"),
    ();

  return [newSearch, options] as const;
}

export const [newSearch, options] = createOptions();
