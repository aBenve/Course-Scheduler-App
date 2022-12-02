import { from, map, share, shareReplay, startWith } from "rxjs";

import init, { set_panic_hook } from "@course-scheduler-app/scheduler-wasm";
import { initializeApi } from "../api";
import {debug} from "./utils";
async function load() {
  await init();
  set_panic_hook();
}

const initialized = from(load());

const apiStore = initialized.pipe(
  map(() => initializeApi()),
  startWith(null),
  //debug("api"),
  shareReplay(1),
);

export default apiStore;
