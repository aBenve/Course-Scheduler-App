import { from, map, shareReplay, startWith } from "rxjs";

import init, { set_panic_hook } from "@course-scheduler-app/scheduler-wasm";
import { initializeApi } from "../api";
async function load() {
  await init();
  set_panic_hook();
}

const initialized = from(load());

const apiStore = initialized.pipe(
  map(() => initializeApi()),
  startWith(undefined),
  //debug("api"),
  shareReplay(1)
);

export default apiStore;
