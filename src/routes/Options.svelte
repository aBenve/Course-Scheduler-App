<script lang="ts">
  import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
  import ControlsArea from "../components/ControlsArea.svelte";
  import CalendarArea from "../components/CalendarArea.svelte";
</script>

<main class="bg-blue-300 h-screen gridContainer">
  <ControlsArea
    class="col-start-1 row-start-1 row-span-full md:block hidden  m-2 mr-0"
  />
  <SubjectsOptionsArea
    class="col-start-2 col-span-full m-2 mb-0 row-span-2 overflow-x-auto"
  />
  <CalendarArea
    class="col-start-2  col-span-full m-2 row-span-4 overflow-x-auto"
  />
</main>

<style>
  .gridContainer {
    display: grid;
    grid-template-rows: repeat(6, minmax(0, 1fr));
    grid-template-columns: 0 repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 768px) {
    .gridContainer {
      grid-template-columns: 20em repeat(4, minmax(0, 1fr));
    }
  }
</style>
