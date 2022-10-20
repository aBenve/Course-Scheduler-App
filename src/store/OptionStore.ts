import { derived, writable, type Writable } from "svelte/store";
import type { Choice } from "scheduler-wasm";
import { isEqual } from "lodash";
import generateChoices from "../generator";
import {
  scan,
  map,
  takeUntil,
  switchMap,
  switchAll,
  takeWhile,
  toArray,
  Subject,
  combineLatest,
  concatAll,
  startWith,
  finalize,
  zip,
  tap,
  distinctUntilChanged,
  BehaviorSubject,
  share,
  shareReplay,
  ReplaySubject,
} from "rxjs";
import finalizedSubjects from "./FinalizedSubjectsStore";
import { toObservable, debug } from "./utils";
import settings from "./UserSettingsStore";
import selectedOption from "./SelectedOptionStore";

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
  let subjects = toObservable(finalizedSubjects).pipe(
    //debug("Subjects!"),
    shareReplay()
  );
  let querySettings = toObservable(settings).pipe(
    //debug("Settings!"),
    shareReplay()
  );
  let queryParameters = combineLatest([subjects, querySettings]).pipe(
    map(
      ([subjects, querySettings]) =>
        ({
          mandatory: subjects.mandatory.map((s) => s.id),
          optional: subjects.optional.map((s) => s.id),
          min_subject_count: querySettings.subjects,
          min_credit_count: querySettings.credits,
        } as QueryParameters)
    ),
    //debug("QueryParameters!"),
    share()
  );

  let generator = queryParameters.pipe(map(generateChoices));

  let optionsHigherOrder = generator.pipe(
    tap({ next: () => selectedOption.set(null) }),
    //debug("Generator!"),
    map((gen) =>
      addPageObservable.pipe(
        startWith(null),
        map((_) => [...take(gen.iterator, 10)]),
        map((v) => ({ values: v, done: v.length == 0 })),
        startWith({ values: [], done: false }),
        takeUntil(generator),
        scan((a, v) => ({
          values: [...a.values, ...v.values],
          done: a.done || v.done,
        })),
        finalize(() => gen.free())
      )
    )
  );

  let options = zip(
    optionsHigherOrder,
    combineLatest([subjects, querySettings]).pipe(map(([s, q]) => s))
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

  return options;
}

export const options = createOptions();
