<script lang="ts">
  import type { Choice } from "@course-scheduler-app/scheduler-wasm";
  import { fly } from "svelte/transition";
  import { options } from "../store/OptionStore";
  import selectedOption from "../store/SelectedOptionStore";
  import colors from "../utils/colors";
  import CalendarEvent from "./CalendarEvent.svelte";

  let firstHour = 8;
  let lastHour = 22;

  let clazz: string;

  let option: Choice | null;
  $: option = selectedOption == null ? null : $options.values[$selectedOption];

  $: localSortedSubjects =
    option == null
      ? null
      : $options.sortedSubjects.filter((v) => option.subjects.has(v));

  export { clazz as class };
</script>

<div class={clazz}>
  <!-- <div
    in:fly={{ y: 10, duration: 500, delay: 500 }}
    class="bg-area dark:bg-area-dark h-full w-full p-5 rounded-lg flex flex-col items-center gap-y-5 overflow-auto "
  > -->
  <div
    in:fly={{ y: 10, duration: 500, delay: 500 }}
    class=" h-full w-full rounded-lg flex flex-col items-center gap-y-5 overflow-auto "
  >
    <!-- <Calendar {plugins} {options} /> -->
    {#if option == null}
      <div
        class="w-full h-full flex justify-center items-center  bg-area dark:bg-area-dark colorTransition"
      >
        <span
          class="px-3 py-2 text-text-dark dark:text-text hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark rounded-lg colorTransition"
        >
          No option selected
        </span>
      </div>
    {:else}
      <div
        class="bg-zone-terciary dark:bg-zone-terciary-dark w-full h-full CalendarGrid rounded-lg overflow-auto text-text-dark dark:text-text bg-opacity-50 colorTransition"
      >
        <!-- <div class="day col-start-5 row-start-1 row-end-32 bg-red-400" /> -->
        {#each Array(lastHour - firstHour + 1) as _, i}
          <div
            class="col-start-1 row-start-{i * 2 + 2} col-span-7 row-span-2 {i %
            2
              ? 'bg-zone dark:bg-zone-dark'
              : 'bg-area dark:bg-area-dark'} colorTransition"
          />
        {/each}

        {#each ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as day, i}
          <div class="day font-medium col-start-{i + 2} row-start-1 px-2 ">
            {day}
          </div>
        {/each}

        {#each Array(lastHour - firstHour + 1) as _, i}
          <div class="time row-start-{i * 2 + 2} col-start-1 row-span-2">
            {String(((i + firstHour - 1) % 12) + 1).padStart(2, "0")}:00
          </div>
        {/each}

        {#each Array.from(option.week.entries()) as [day, dayTasks]}
          {#each dayTasks as task (`${task.subject} - ${day} ${task.span.start.hour}:${task.span.start.minutes} - ${task.span.end.hour}:${task.span.end.minutes}`)}
            <CalendarEvent
              title={option.subjects.get(task.subject).name}
              color={colors[localSortedSubjects.indexOf(task.subject)]}
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
    grid-template-columns: 5em repeat(6, minmax(7em, 1fr));
    grid-template-rows: 2em repeat(30, minmax(0.7em, 1fr));
  }
  .time,
  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7em;
  }
  /*@media (min-width: 1024px) {*/
  /*.CalendarGrid {*/
  /*grid-template-columns: 5em repeat(6, minmax(0, 1fr));*/
  /*}*/
  /*}*/
  @media (min-width: 640px) {
    .time {
      font-size: 0.7em;
    }
    .day {
      font-size: 0.8em;
    }
  }
</style>
