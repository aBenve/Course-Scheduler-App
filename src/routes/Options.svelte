<script lang="ts">
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import CalendarArea from "../components/CalendarArea.svelte";
  import options from "../store/OptionStore";
  import selectedOption from "../store/SelectedOptionStore";
  import settings from "../store/UserSettingsStore";
  import subjects from "../store/SubjectStore";
  import { fly, fade } from "svelte/transition";
  import {
    Semester,
    get_subject_info,
    load_from_api,
    SubjectInfo,
  } from "scheduler-wasm";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";

  $: {
    $selectedOption = null;
    options.setQuery({
      mandatory: $subjects.mandatory
        .filter((s) => !s.isDndShadowItem)
        .map((s) => s.id),
      optional: $subjects.optional
        .filter((s) => !s.isDndShadowItem)
        .map((s) => s.id),
      min_credit_count: $settings.credits,
      min_subject_count: $settings.subjects,
    });
    /*options.addPage();*/
  }

  let colorMode = "light";
  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove(colorMode);
    colorMode = colorMode === "light" ? "dark" : "light";
    aux.classList.add(colorMode);
  }

  async function load() {
    await load_from_api(2022, Semester.Second);

    let mandatory = ["72.07", "72.38", "12.83"];
    let optional = [
      "72.37",
      "61.23",
      "72.41",
      "72.42",
      "93.75",
      "72.43",
      "94.23",
      "16.50",
      "23.15",
      "61.50",
      "72.58",
      "72.60",
      "72.74",
      "72.75",
      "72.89",
      "72.92",
      "94.42",
      "94.62",
    ];

    function to_subject(subject: SubjectInfo): Subject {
      return {
        id: subject.code,
        title: subject.name,
      };
    }

    let mandatory_subjects = mandatory.map(get_subject_info).map(to_subject);
    let optional_subjects = optional.map(get_subject_info).map(to_subject);

    console.log(mandatory_subjects, optional_subjects);

    $subjects = {
      mandatory: mandatory_subjects,
      optional: optional_subjects,
      ignore: [],
    };

    /*function timeout(ms: number) {*/
    /*return new Promise((resolve) => setTimeout(resolve, ms));*/
    /*}*/
    /*await timeout(1000000);*/
  }

  let loading = load();
</script>

<div
  class="absolute top-4 right-4 p-2 hidden xl:block bg-area rounded-lg dark:bg-area-dark text-text-dark dark:text-text cursor-pointer hover:opacity-50"
  on:click={handleColorModeToggle}
>
  toggle
</div>
<main class="bg-background dark:bg-background-dark h-screen">
  {#await loading}
    <div class="w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  {:then}
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
  {/await}
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
