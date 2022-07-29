<script lang="ts">
  import type { Time, DaysOfTheWeek } from "scheduler-wasm";

  export let start: Time;
  export let end: Time;
  export let day: DaysOfTheWeek;
  export let title: string;
  export let calendarFirstHour: number;

  $: dayIndex = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ].indexOf(day);

  $: startHour = start.hour + start.minutes / 60;
  $: endHour = end.hour + end.minutes / 60;
</script>

<div
  class="col-start-{dayIndex + 2} row-start-{Math.round(
    (startHour - calendarFirstHour) * 2
  ) + 2} row-end-{Math.round((endHour - calendarFirstHour) * 2) +
    2} rounded-lg bg-pink-400 border-2 border-solid border-black"
>
  <div class="h-full flex justify-center items-center text-center text-[12px]">
    {title}
  </div>
</div>
