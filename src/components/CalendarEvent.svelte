<script lang="ts">
  import type {
    DaysOfTheWeek,
    Time,
  } from "@course-scheduler-app/scheduler-wasm";
  import { fade, fly } from "svelte/transition";
  import colorSettings from "../store/UserColorsStore";

  export let start: Time;
  export let end: Time;
  export let day: DaysOfTheWeek;
  export let title: string;
  export let commision: string;
  export let calendarFirstHour: number;
  export let color: string;

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
  in:fly={{ y: -10, duration: 500 }}
  class="col-start-{dayIndex + 2} row-start-{Math.round(
    (startHour - calendarFirstHour) * 2
  ) + 2} row-end-{Math.round((endHour - calendarFirstHour) * 2) +
    2}  hover:opacity-90 hover:scale-105 transition-all ease-in-out duration-150 p-2 m-0.5 rounded-lg relative"
  style="
    background-color: 
  {$colorSettings.colorMode == 'dark' ? color + '50' : color + '30'}; 
  "
>
  <div
    class="h-full flex justify-center items-center text-center sm:text-xs text-[0.6rem] font-medium"
    style="color: {color}"
  >
    {title}
  </div>
  <div class="absolute right-2 bottom-1 opacity-50" style="color: {color}">
    {commision}
  </div>
</div>

<style>
  div {
    pointer-events: none;
  }
</style>
