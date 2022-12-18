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

  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove($colorSettings.colorMode);
    $colorSettings.changeColorMode();
    aux.classList.add($colorSettings.colorMode);
  }

  $: loading = $courseCommissionsStore === null;
</script>

<main class="bg-background dark:bg-background-dark h-screen colorTransition">
  {#if loading}
    <div class="w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  {:else}
    <div
      class="w-full h-full gridContainer px-4 py-4 gap-4"
      transition:fade={{ duration: 500 }}
    >
      <ControlsArea
        class="col-start-1 row-start-1 row-span-full lg:block hidden  "
      />
      <SubjectsOptionsArea
        class="col-start-5 row-start-1  row-span-full overflow-x-auto "
      />
      <CalendarArea class="col-start-2 col-span-3 row-start-2 row-span-full" />

      <div
        class="col-start-2 col-span-3 row-start-1 row-span-1 relative"
        in:fly={{ y: -10, duration: 500, delay: 500 }}
      >
        <ToggleColorModeButton class="absolute right-0 top-0" />
      </div>
    </div>
  {/if}
</main>

<style>
  .gridContainer {
    display: grid;
    grid-template-rows: repeat(4, minmax(0, 1fr));
    grid-template-columns: 20em repeat(3, minmax(0, 1fr)) auto;
  }
  /* @media (min-width: 1024px) {
    .gridContainer {
      grid-template-columns: 20em repeat(4, minmax(0, 1fr));
    }
  } */
</style>
