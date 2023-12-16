import type { SubjectPlan } from "@course-scheduler-app/scheduler-wasm";
import {
    combineLatestWith,
    concatMap,
    from,
    map,
    shareReplay,
    startWith,
} from "rxjs";
import apiStore from "./ApiStore";
import selectedPlan from "./SelectedPlanStore";
import { toObservable } from "./utils";

const plan = toObservable(selectedPlan);

const planStore = apiStore.pipe(
    combineLatestWith(plan),
    concatMap(([api, plan]) =>
        api !== undefined && plan !== undefined
            ? from(api.get_plan_from_api(plan)).pipe(
                map((plan) => plan ?? null),
                startWith(undefined)
            )
            : Promise.resolve(undefined as SubjectPlan)
    ),
    shareReplay(1)
);

export default planStore;
