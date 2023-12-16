import selectedTerm from "./SelectedTermStore";

import type { Commissions } from "@course-scheduler-app/scheduler-wasm";
import {
  combineLatestWith,
  concatMap,
  from,
  map,
  shareReplay,
  startWith,
} from "rxjs";
import apiStore from "./ApiStore";
import { toObservable } from "./utils";

const term = toObservable(selectedTerm);

const courseCommissionsStore = apiStore.pipe(
  combineLatestWith(term),
  concatMap(([api, { year, semester }]) =>
    api !== undefined
      ? from(api.get_commissions_from_api(year, semester)).pipe(
        map((courseCommissions) => courseCommissions ?? null),
        startWith(undefined)
      )
      : Promise.resolve(undefined as Commissions)
  ),
  //debug("Course commissions"),
  shareReplay(1)
);

export default courseCommissionsStore;
