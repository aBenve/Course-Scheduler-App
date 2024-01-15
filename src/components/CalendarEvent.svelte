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
  export let buildings: string[];
  export let title: string;
  export let commisions: string[];
  export let calendarFirstHour: number;
  export let color: string;
  export let hasPointerEvents: boolean = true;

  const buildingMappings = {
    "External": "Virtual",
    "Sede Distrito Financiero": "SDF",
    "Sede Rectorado": "SR",
    "Sede Distrito Tecnologico": "SDT",
  };
  $: fixedBuildings = buildings.map(b => buildingMappings[b] ?? b);

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
  class="{hasPointerEvents ? '' : 'event-passthrough'} col-start-{dayIndex +
    2} row-start-{Math.round((startHour - calendarFirstHour) * 2) +
    2} row-end-{Math.round((endHour - calendarFirstHour) * 2) +
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
    {fixedBuildings} - {commisions}
  </div>
</div>

<style>
  .event-passthrough {
    pointer-events: none;
  }
</style>
