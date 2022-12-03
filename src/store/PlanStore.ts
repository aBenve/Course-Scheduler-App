import type { SubjectPlan } from "@course-scheduler-app/scheduler-wasm";
import {
  combineLatestWith,
  concatMap, shareReplay,
  startWith
} from "rxjs";
import apiStore from "./ApiStore";
import selectedPlan from "./SelectedPlanStore";
import { toObservable } from "./utils";

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
