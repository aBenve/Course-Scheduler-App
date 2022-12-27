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
    <div
      class="w-full h-full {isControlAreaOpen
        ? 'gridContainer'
        : 'smallGridContainer'}  px-4 py-4 gap-4"
      transition:fade={{ duration: 500 }}
    >
      <ControlsArea
        class="col-start-1 row-start-1 row-span-full "
        onToggle={(state) => (isControlAreaOpen = state)}
      />
      <SubjectsOptionsArea
        class="col-start-5 row-start-1  row-span-full overflow-x-auto "
      />
      <CalendarArea
        class="{isControlAreaOpen
          ? 'col-start-2'
          : 'col-start-1'} col-span-3 row-start-2 row-span-full"
      />

      <ConfigurationArea
        class="{isControlAreaOpen
          ? 'col-start-2'
          : 'col-start-1'}  col-span-3 row-start-1 row-span-1 relative"
      />
    </div>
  {/if}
</main>

<style>
  .gridContainer {
    display: grid;
    grid-template-rows: repeat(4, minmax(0, 1fr));
    grid-template-columns: auto repeat(3, minmax(0, 1fr)) auto;
  }
  .smallGridContainer {
    display: grid;
    grid-template-rows: repeat(4, minmax(0, 1fr));
    grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  }
  /* @media (min-width: 1024px) {
    .gridContainer {
      grid-template-columns: 20em repeat(4, minmax(0, 1fr));
    }
  } */
</style>
