<script lang="ts">
  import Controls from "../components/Controls.svelte";
</script>

<main class="bg-blue-300 h-screen gridContainer">
  <Controls class="grid-rows-1 row-span-full lg:block hidden  m-2" />
  <div class="SubjectOptions bg-red-500 ">a</div>
  <div class="Calendar bg-red-600 ">a</div>
</main>

<style>
  .gridContainer {
    display: grid;
    grid-template:
      "Controls SubjectOptions SubjectOptions SubjectOptions SubjectOptions"
      "Controls SubjectOptions SubjectOptions SubjectOptions SubjectOptions"
      "Controls Calendar Calendar Calendar Calendar"
      "Controls Calendar Calendar Calendar Calendar";
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }

  .SubjectOptions {
    grid-area: SubjectOptions;
  }
  .Calendar {
    grid-area: Calendar;
  }

  @media (max-width: 1024px) {
    .gridContainer {
      grid-template:
        "SubjectOptions SubjectOptions SubjectOptions SubjectOptions"
        "SubjectOptions SubjectOptions SubjectOptions SubjectOptions"
        "Calendar Calendar Calendar Calendar"
        "Calendar Calendar Calendar Calendar";
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
