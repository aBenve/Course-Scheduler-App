<script lang="ts">
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import CalendarArea from "../components/CalendarArea.svelte";
  import options from "../store/OptionStore";
  import selectedOption from "../store/SelectedOptionStore";
  import settings from "../store/UserSettingsStore";
  import subjects from "../store/SubjectStore";

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
    options.addPage();
  }

  let colorMode = "light";
  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove(colorMode);
    colorMode = colorMode === "light" ? "dark" : "light";
    aux.classList.add(colorMode);
  }
</script>

<div
  class="absolute top-4 right-4 p-2 hidden xl:block bg-area rounded-lg dark:bg-area-dark text-text-dark dark:text-text cursor-pointer hover:opacity-50"
  on:click={handleColorModeToggle}
>
  toggle
</div>
<main
  class="bg-background dark:bg-background-dark h-screen gridContainer xl:px-40 md:px-16  px-4 py-4 lg:py-4"
>
  <ControlsArea
    class="col-start-1 row-start-1 row-span-full lg:block hidden mr-5 "
  />
  <SubjectsOptionsArea
    class="col-start-2 col-span-full mb-5 row-span-3 overflow-x-auto "
  />
  <CalendarArea class="col-start-2  col-span-full row-span-4" />
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
