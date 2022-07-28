<script lang="ts">
  import type { Time, DaysOfTheWeek } from "scheduler-wasm";

  export let start: Time;
  export let end: Time;
  export let day: DaysOfTheWeek;

  let dayIndex = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ].indexOf(day);
</script>

<div
  class="col-start-{dayIndex} row-start-{start.hour - 6} row-end-{end.hour -
    6} "
>
  <div class="bg-pink-400 h-full ">evento</div>
</div>
