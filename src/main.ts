import "./app.css";
import App from "./App.svelte";

import init, {
  set_panic_hook,
  start_generator,
  Semester,
  get_subject_info,
  load_from_api,
  next_option,
} from "scheduler-wasm";

init().then(async () => {
  set_panic_hook();
  await load_from_api(2022, Semester.Second);
  console.log(get_subject_info("61.20"));
  start_generator(
    ["72.07", "72.38", "12.83"],
    [
      //"72.07",
      //"72.38",
      //"12.83",
      "61.23",
      "72.41",
      "72.42",
      "93.75",
      "72.43",
      "94.23",
      "16.50",
      "23.15",
      "61.50",
      //"72.52",
      "72.58",
      "72.60",
      "72.74",
      "72.75",
      "72.89",
      "72.92",
      "94.42",
      "94.62",
    ]
  );
  next_option();

});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
