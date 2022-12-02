import {
  combineLatestWith,
  concatMap,
  map,
  pipe,
  shareReplay,
  startWith,
} from "rxjs";
import { debug, toObservable } from "./utils";
import apiStore from "./ApiStore";
import selectedPlan from "./SelectedPlanStore";
import type { SubjectPlan } from "@course-scheduler-app/scheduler-wasm";

const plan = toObservable(selectedPlan);

const planStore = apiStore.pipe(
  combineLatestWith(plan),
  concatMap(([api, plan]) => 
    api !== null
      ? api.get_plan_from_api(plan)
      : Promise.resolve(null as SubjectPlan)
  ),
  startWith(null),
  shareReplay(1)
);

export default planStore;
