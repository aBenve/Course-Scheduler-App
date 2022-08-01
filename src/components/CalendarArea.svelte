<script lang="ts">
  import CalendarEvent from "./CalendarEvent.svelte";
  import type { DaysOfTheWeek } from "scheduler-wasm";
  import selectedOption from "../store/SelectedOptionStore";
  import options from "../store/OptionStore";
  import colors from "../utils/colors";

  let firstHour = 8;
  let lastHour = 22;

  let clazz: string;

  $: option = selectedOption == null ? null : $options.options[$selectedOption];

  export { clazz as class };
</script>

<div class={clazz}>
  <div
    class="bg-area dark:bg-area-dark h-full w-full p-5 rounded-lg flex flex-col items-center gap-y-5 overflow-auto "
  >
    <!-- <Calendar {plugins} {options} /> -->
    {#if option == null}
      <div class="w-full h-full flex justify-center items-center  ">
        <span
          class="px-3 py-2 hover:bg-gray-300 rounded-lg transition-all ease-in-out duration-150"
        >
          No option selected
        </span>
      </div>
    {:else}
      <div
        class="bg-gray-300 w-full h-full CalendarGrid rounded-lg overflow-auto "
      >
        <!-- <div class="day col-start-5 row-start-1 row-end-32 bg-red-400" /> -->
        {#each Array(lastHour - firstHour + 1) as _, i}
          <div
            class="col-start-1 row-start-{i * 2 + 2} col-span-7 row-span-2 {i %
            2
              ? 'bg-zone dark:bg-zone-dark'
              : 'bg-gray-100 dark:bg-zone-secundary-dark'}"
          />
        {/each}

        {#each ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as day, i}
          <div class="day font-medium col-start-{i + 2} row-start-1 px-2">
            {day}
          </div>
        {/each}

        {#each Array(lastHour - firstHour + 1) as _, i}
          <div class="time row-start-{i * 2 + 2} col-start-1 row-span-2">
            {String(((i + firstHour - 1) % 12) + 1).padStart(2, "0")}:00
          </div>
        {/each}

        {#each Object.entries(option.week) as [day, dayTasks]}
          {#each dayTasks as task, i}
            <CalendarEvent
              title={option.subjects[task.subject].name}
              color={colors[i]}
              {day}
              start={task.span.start}
              end={task.span.end}
              calendarFirstHour={firstHour}
            />
          {/each}
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .CalendarGrid {
    display: grid;
    grid-template-columns: 5em repeat(6, 1fr);
    grid-template-rows: 2em repeat(30, 1fr);
  }
  .time,
  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7em;
  }
  @media (min-width: 640px) {
    .time {
      font-size: 0.7em;
    }
    .day {
      font-size: 0.8em;
    }
  }
</style>
