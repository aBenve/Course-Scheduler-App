<script lang="ts">
  import { fade } from "svelte/transition";
  import CalendarArea from "../components/CalendarArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ToggleColorModeButton from "../components/ToggleColorModeButton.svelte";
  import courseCommissionsStore from "../store/CourseCommissionsStore";
  import colorSettings from "../store/UserColorsStore";

  import { fly } from "svelte/transition";
  import ConfigurationArea from "src/components/ConfigurationArea.svelte";

  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove($colorSettings.colorMode);
    $colorSettings.changeColorMode();
    aux.classList.add($colorSettings.colorMode);
  }

  let isControlAreaOpen: boolean = true;

  $: console.log(isControlAreaOpen);

  $: loading = $courseCommissionsStore === null;
</script>

<main class="bg-background dark:bg-background-dark h-screen colorTransition">
  {#if loading}
    <div class="w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  {:else}
    <main
      class="w-full h-full {isControlAreaOpen
        ? 'gridContainer'
        : 'smallGridContainer'}  px-4 py-4 "
      transition:fade={{ duration: 500 }}
    >
      <!-- <ControlsArea
        class="col-start-1 row-start-1 row-span-full "
        onToggle={(state) => (isControlAreaOpen = state)}
      />
      <SubjectsOptionsArea
        class="{isControlAreaOpen
          ? 'col-start-5'
          : 'col-start-4'} row-start-1  row-span-full overflow-x-auto "
      />
      <CalendarArea
        class="{isControlAreaOpen
          ? 'col-start-2  '
          : 'col-start-1 '} col-span-3 row-start-2 row-span-full"
      />

      <ConfigurationArea
        class="{isControlAreaOpen
          ? 'col-start-2'
          : 'col-start-1'}  col-span-3 row-start-1 row-span-1 relative"
      /> -->
      <section class="control-area">
        <ControlsArea
          class="w-full h-full"
          onToggle={(state) => (isControlAreaOpen = state)}
        />
      </section>

      <section class="configuration-area">
        <ConfigurationArea class="w-full h-full" />
      </section>
      <section class="calendar-area">
        <CalendarArea class="w-full h-full" />
      </section>
      <section class="subjects-area">
        <SubjectsOptionsArea class="w-full h-full" />
      </section>
    </main>
  {/if}
</main>

<style>
  .gridContainer {
    display: grid;
    gap: 1rem;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(auto, 17em) minmax(0, 1fr) minmax(17em, auto);
    grid-template-areas:
      "controls-area configuration-area subjects-area"
      "controls-area calendar-area subjects-area";
  }
  .smallGridContainer {
    display: grid;
    gap: 1rem;
    grid-template-rows: auto auto minmax(0, 1fr);
    grid-template-columns: 1fr minmax(17em, auto);
    grid-template-areas:
      "controls-area subjects-area"
      "configuration-area subjects-area"
      "calendar-area subjects-area";
  }

  .control-area {
    grid-area: controls-area;
  }
  .configuration-area {
    grid-area: configuration-area;
  }
  .subjects-area {
    grid-area: subjects-area;
  }
  .calendar-area {
    grid-area: calendar-area;
  }
</style>
