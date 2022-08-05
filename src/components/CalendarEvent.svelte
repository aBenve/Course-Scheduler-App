<script lang="ts">
  import type { Time, DaysOfTheWeek } from "scheduler-wasm";

  export let start: Time;
  export let end: Time;
  export let day: DaysOfTheWeek;
  export let title: string;
  export let calendarFirstHour: number;
  export let color: string;

  console.log(color);

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
    2}  hover:opacity-90 hover:scale-105 transition-transform ease-in-out duration-150 p-2 m-0.5 rounded-lg"
  style="
    background-color: {color}60;
    
  "
>
  <div
    class="h-full flex justify-center items-center text-center sm:text-xs text-[0.6rem] font-bold"
    style="color: {color}"
  >
    {title}
  </div>
</div>
