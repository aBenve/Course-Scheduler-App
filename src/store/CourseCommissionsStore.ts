import selectedTerm from "./SelectedTermStore";

import type { Commissions } from "@course-scheduler-app/scheduler-wasm";
import {
  combineLatestWith,
  concatMap, shareReplay,
  startWith
} from "rxjs";
import apiStore from "./ApiStore";
import { toObservable } from "./utils";

const term = toObservable(selectedTerm);

const courseCommissionsStore = apiStore.pipe(
  combineLatestWith(term),
  concatMap(([api, { year, semester }]) =>
    api !== null
      ? api.get_commissions_from_api(year, semester)
      : Promise.resolve(null as Commissions)
  ),
  //debug("Course commissions"),
  startWith(null),
  shareReplay(1)
);

export default courseCommissionsStore;
