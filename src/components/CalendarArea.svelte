<script lang="ts">
  import type {
    Choice,
    DaysOfTheWeek,
    Time,
  } from "@course-scheduler-app/scheduler-wasm";
  import { lowerCase } from "lodash";
  import App from "src/App.svelte";
  import { fly } from "svelte/transition";
  import { options } from "../store/OptionStore";
  import { selectedOption } from "../store/SelectedOptionStore";
  import colors from "../utils/colors";
  import CalendarCell from "./CalendarCell.svelte";
  import CalendarEvent from "./CalendarEvent.svelte";
  import ControlContent from "./ControlContent.svelte";

  let firstHour = 8;
  let lastHour = 22;

  let clazz: string;

  $: localSortedSubjects =
    $selectedOption === null
      ? null
      : $options.sortedSubjects.filter((v) => $selectedOption.subjects.has(v));

  type Span = { day: DaysOfTheWeek; start: Time; end: Time };

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let spans: Span[] = [];

  let spanDragging: Span = null;

  function cmpTime(left: Time, right: Time): number {
    return left.hour < right.hour ||
      (left.hour == right.hour && left.minutes < right.minutes)
      ? -1
      : left.hour == right.hour && left.minutes == right.minutes
      ? 0
      : 1;
  }

  function orderTimes(first: Time, second: Time) {
    function getNext(time: Time) {
      time = Object.assign({}, time);

      time.minutes += 30;
      if (time.minutes >= 60) {
        time.minutes = 0;
        time.hour += 1;
      }
      return time;
    }
    return cmpTime(first, second) == 1
      ? ([second, getNext(first)] as const)
      : ([first, getNext(second)] as const);
  }

  function isInSpan(time: Time, { start, end }: { start: Time; end: Time }) {
    return cmpTime(start, time) <= 0 && cmpTime(time, end) < 0;
  }

  function indexToTime(i: number) {
    return { hour: Math.floor(i / 2) + firstHour, minutes: (i % 2) * 30 };
  }

  function cellMouseDown(day2: string, i: number) {
    let day = day2.toLowerCase() as DaysOfTheWeek;
    let span = {
      start: indexToTime(i),
      end: indexToTime(i),
    };
    let existingSpanIndex = spans.findIndex(
      (s) => s.day === day && isInSpan(span.start, s)
    );

    if (existingSpanIndex !== -1) {
      spans.splice(existingSpanIndex, 1);
      spans = spans;
    } else {
      spanDragging = {
        day,
        ...span,
      };
    }
  }
  function cellMouseUp(day: string, i: number) {
    if (spanDragging !== null) {
      let [start, end] = orderTimes(spanDragging.start, spanDragging.end);
      spanDragging = {
        ...spanDragging,
        start,
        end,
      };
      spans = [...spans, spanDragging];
      spanDragging = null;
    }
  }
  function cellMouseEnter(day: string, i: number) {
    if (spanDragging !== null) {
      spanDragging.end = indexToTime(i);
    }
  }
  $: spanDragging !== null && console.log(spanDragging.start, spanDragging.end);

  export { clazz as class };
</script>

<div class={clazz}>
  <!-- <div
    in:fly={{ y: 10, duration: 500, delay: 500 }}
    class="bg-area dark:bg-area-dark h-full w-full p-5 rounded-lg flex flex-col items-center gap-y-5 overflow-auto "
  > -->
  <div
    in:fly={{ y: 10, duration: 500, delay: 500 }}
    class=" h-full w-full rounded-2xl flex flex-col items-center gap-y-5 overflow-auto "
  >
    <!-- <Calendar {plugins} {options} /> -->
    {#if $selectedOption === null}
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
        class="bg-zone dark:bg-zone-dark w-full h-full CalendarGrid rounded-2xl overflow-auto text-text-dark dark:text-text bg-opacity-50 colorTransition"
      >
        {#each daysOfTheWeek as day, i}
          <div
            on:mouseleave={() => (spanDragging = null)}
            class="col-start-{i + 2} row-start-2 row-span-{(lastHour -
              firstHour +
              1) *
              2}"
          />
        {/each}
        <!-- <div class="day col-start-5 row-start-1 row-end-32 bg-red-400" /> -->
        {#each daysOfTheWeek as day, t}
          {#each Array((lastHour - firstHour + 1) * 2) as _, i}
            <CalendarCell
              col={t + 2}
              row={i + 2}
              on:cellmousedown={(e) => {
                e.preventDefault();
                if (e.detail.buttons === 1) {
                  cellMouseDown(day, i);
                }
              }}
              on:cellmouseenter={() => cellMouseEnter(day, i)}
              on:cellmouseup={() => cellMouseUp(day, i)}
              bgColor={Math.floor(i / 2) % 2
                ? "bg-zone dark:bg-background-dark"
                : "bg-area dark:bg-area-dark"}
            />
          {/each}
        {/each}

        {#each daysOfTheWeek as day, i}
          <div class="day  col-start-{i + 2} row-start-1 px-2 ">
            {day}
          </div>
        {/each}

        {#each Array(lastHour - firstHour + 1) as _, i}
          <div
            class="time row-start-{i * 2 + 2} col-start-1 row-span-2 {i % 2
              ? 'bg-zone dark:bg-background-dark'
              : 'bg-area dark:bg-area-dark'} colorTransition"
          >
            {String(((i + firstHour - 1) % 12) + 1).padStart(2, "0")}:00
          </div>
        {/each}

        {#each Array.from($selectedOption.week.entries()) as [day, dayTasks]}
          {#each dayTasks as task (`${task.subject} - ${day} ${task.span.start.hour}:${task.span.start.minutes} - ${task.span.end.hour}:${task.span.end.minutes}`)}
            <CalendarEvent
              title={$selectedOption.subjects.get(task.subject).name}
              commisions={$selectedOption.subjects.get(task.subject).commissions}
              color={colors[localSortedSubjects.indexOf(task.subject)]}
              {day}
              start={task.span.start}
              end={task.span.end}
              calendarFirstHour={firstHour}
            />
          {/each}
        {/each}

        {#each spans as span}
          <CalendarEvent
            title=""
            commisions=""
            color={colors[0]}
            day={span.day}
            start={span.start}
            end={span.end}
            calendarFirstHour={firstHour}
            hasPointerEvents={false}
          />
        {/each}

        {#if spanDragging !== null}
          <CalendarEvent
            title=""
            commisions=""
            color={colors[0]}
            day={spanDragging.day}
            {...(() => {
              let [start, end] = orderTimes(
                spanDragging.start,
                spanDragging.end
              );
              return { start, end };
            })()}
            calendarFirstHour={firstHour}
            hasPointerEvents={false}
          />
        {/if}
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
