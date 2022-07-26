<script lang="ts">
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import CalendarArea from "../components/CalendarArea.svelte";
</script>

<main class="bg-blue-300 h-screen gridContainer">
  <ControlsArea class="grid-rows-1 row-span-full lg:block hidden  m-2 mr-0" />
  <SubjectsOptionsArea class="grid-col-2  col-span-4 m-2 mb-0 row-span-2" />
  <CalendarArea class="grid-col-2  col-span-4 m-2 row-span-2" />
</main>

<style>
  .gridContainer {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }
</style>
