<script lang="ts">
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import CalendarArea from "../components/CalendarArea.svelte";
  import { initialize, options } from "../store/OptionStore";
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
  import {
    loadSelectedSubjectCategorization,
    saveSelectedSubjectCategorization,
  } from "../storage";
  import { onDestroy } from "svelte";

  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove($colorSettings.colorMode);
    $colorSettings.changeColorMode();
    aux.classList.add($colorSettings.colorMode);
  }

  $: $courseCommissionsStore !== null &&
    courseCommissionsChanged($courseCommissionsStore);

  function courseCommissionsChanged(courseCommissions: Commissions) {
    initialize();
    // console.log(plan.get_subject_dependencies("72.07").map(code => plan.get_subject_info(code).name))
    // console.log(plan.get_subjects())

    function getSubjectInfo(code: string): SubjectInfo {
      let info = courseCommissions.get_subject_info(code);
      if (info == null) {
        throw Error(`Subject code ${code} does not exist.`);
      }
      return info;
    }

    function to_subject(subject: SubjectInfo): Subject {
      return {
        id: subject.code,
        title: subject.name,
      };
    }

    const { mandatory, optional, ignore } = loadSelectedSubjectCategorization();
    let mandatory_subjects = mandatory.map(getSubjectInfo).map(to_subject);
    let optional_subjects = optional.map(getSubjectInfo).map(to_subject);
    let ignore_subjects = ignore.map(getSubjectInfo).map(to_subject);

    $subjects = {
      mandatory: mandatory_subjects,
      optional: optional_subjects,
      ignore: ignore_subjects,
    };

    $finalizedSubjects = $subjects;

    /*function timeout(ms: number) {*/
    /*return new Promise((resolve) => setTimeout(resolve, ms));*/
    /*}*/
    /*await timeout(1000000);*/
  }

  $: save($subjects);

  function save(subjects: SubjectCategorization) {
    const { mandatory, optional, ignore } = subjects;
    if (
      mandatory.length === 0 &&
      optional.length === 0 &&
      ignore.length === 0
    ) {
      return;
    }
    function getCodes(subjects: Subject[]) {
      return subjects.map((s) => s.id);
    }
    saveSelectedSubjectCategorization(
      getCodes(mandatory),
      getCodes(optional),
      getCodes(ignore)
    );
  }

  onDestroy(() => {
    $subjects = { mandatory: [], optional: [], ignore: [] };
  });

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
