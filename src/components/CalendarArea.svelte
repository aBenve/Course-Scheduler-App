<script lang="ts">
  import CalendarEvent from "./CalendarEvent.svelte";
  import { DaysOfTheWeek } from "scheduler-wasm";

  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <div
    class="bg-blue-400 h-full p-5 rounded-lg flex flex-col items-center gap-y-5 overflow-y-auto"
  >
    <!-- <Calendar {plugins} {options} /> -->
    <div class="w-full bg-green-400 h-full   CalendarGrid">
      <div class="day col-start-2 col-span-1">Monday</div>
      <div class="day col-start-3 col-span-1">Tuesday</div>
      <div class="day col-start-4 col-span-1">Wednesday</div>
      <div class="day col-start-5 col-span-1">Thursday</div>
      <div class="day col-start-6 col-span-1">Friday</div>

      {#each Array(15) as _, i}
        <div
          class="time row-start-{i + 2} row-span-1 bg-blue-{i % 2
            ? '400'
            : '500'}"
        >
          {String(((i + 8 - 1) % 12) + 1).padStart(2, "0")}:00
        </div>
      {/each}

      <CalendarEvent
        day={DaysOfTheWeek.Monday}
        start={{ hour: 3, minutes: 0 }}
        end={{ hour: 5, minutes: 0 }}
      />
    </div>
  </div>
</div>

<style>
  .CalendarGrid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 2em repeat(15, 1fr);
  }
  .time,
  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
  }
</style>
