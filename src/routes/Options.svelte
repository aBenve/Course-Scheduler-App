<script lang="ts">
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import CalendarArea from "../components/CalendarArea.svelte";
  import { options } from "../store/OptionStore";
  import selectedOption from "../store/SelectedOptionStore";
  import settings from "../store/UserSettingsStore";
  import courseCommissionsStore from "../store/CourseCommissionsStore";
  import colorSettings from "../store/UserColorsStore";
  import subjects, { type SubjectCategorization } from "../store/SubjectStore";
  import finalizedSubjects from "../store/FinalizedSubjectsStore";
  import { fly, fade } from "svelte/transition";
  import type {
    SubjectInfo,
    Commissions,
  } from "@course-scheduler-app/scheduler-wasm";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";
  import { api } from "../api";
  import ToggleColorModeButton from "../components/ToggleColorModeButton.svelte";

  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove($colorSettings.colorMode);
    $colorSettings.changeColorMode();
    aux.classList.add($colorSettings.colorMode);
  }

  $: loading = $courseCommissionsStore === null;
</script>

<ToggleColorModeButton />
<main class="bg-background dark:bg-background-dark h-screen colorTransition">
  {#if loading}
    <div class="w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  {:else}
    <div
      class="w-full h-full gridContainer xl:px-40 md:px-16  px-4 py-4 lg:py-4"
      transition:fade={{ duration: 500 }}
    >
      <ControlsArea
        class="col-start-1 row-start-1 row-span-full lg:block hidden mr-5 "
      />
      <SubjectsOptionsArea
        class="col-start-2 col-span-full mb-5 row-span-3 overflow-x-auto "
      />
      <CalendarArea class="col-start-2  col-span-full row-span-4" />
    </div>
  {/if}
</main>

<style>
  .gridContainer {
    display: grid;
    grid-template-rows: repeat(7, minmax(0, 1fr));
    grid-template-columns: 0 repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    .gridContainer {
      grid-template-columns: 20em repeat(4, minmax(0, 1fr));
    }
  }
</style>
