<script lang="ts">
  import { type Time, DaysOfTheWeek } from "scheduler-wasm";

  export let start: Time;
  export let end: Time;
  export let day: DaysOfTheWeek;

  let dayIndex = [
    DaysOfTheWeek.Monday,
    DaysOfTheWeek.Tuesday,
    DaysOfTheWeek.Wednesday,
    DaysOfTheWeek.Thursday,
    DaysOfTheWeek.Friday,
    DaysOfTheWeek.Saturday,
  ].indexOf(day);
</script>

<div
  class="col-start-{dayIndex} row-start-{start.hour - 6} row-end-{end.hour -
    6} "
>
  <div class="bg-pink-400 h-full ">evento</div>
</div>
