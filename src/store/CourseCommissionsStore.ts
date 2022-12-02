import selectedTerm from "./SelectedTermStore";

import { combineLatestWith, concatMap, map, pipe, shareReplay, startWith } from "rxjs";
import { debug, toObservable } from "./utils";
import apiStore from "./ApiStore";
import type { Commissions } from "@course-scheduler-app/scheduler-wasm";

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
