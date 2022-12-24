<script lang="ts">
  import ControlDragZone from "./ControlDragZone.svelte";
  let flipDurationMs = 0;

  import finalizedSubjects from "../store/FinalizedSubjectsStore";
  import subjects from "../store/SubjectStore";
  import subjectList from "src/store/SubjectListStore";
  import ControlSubjectItem from "./ControlSubjectItem.svelte";
  import App from "src/App.svelte";

  // $: $subjectList = Object.entries($subjects).

  // Debo tomar los 3 arrays que estan en subjects y concatenarlos en uno solo, ademas de agregarle a cada elemento la propiedad de importance

  // console.log(
  //   Object.entries($subjects)
  //     .map(([key, value]) =>
  //       value.map((item) => ({ ...item, importance: key }))
  //     )
  //     .reduce((acc, value) => acc.concat(value), [])
  // );

  $: $subjectList = Object.entries($subjects)
    .map(([key, value]) => value.map((item) => ({ ...item, importance: key })))
    .reduce((acc, value) => acc.concat(value), []);

  //$: console.log($subjectList);

  function handleSubjectListChange(id: string, from: string, to: string): void {
    console.log(id, from, to);
    subjects.update((currentSubjects) => {
      let subjectIndex = currentSubjects[from].findIndex(
        (subject) => subject.id == id
      );
      currentSubjects[to].push(
        currentSubjects[from].splice(subjectIndex, 1)[0]
      );
      console.log(currentSubjects);

      return currentSubjects;
    });
    $finalizedSubjects = $subjects;
  }
</script>

<!-- <div class=" w-full h-full ControlGrid  gap-y-5 overflow-y-auto">
  <ControlDragZone
    {flipDurationMs}
    dragZoneArea="mandatory"
    title="Obligatory"
    class="  "
  />
  <ControlDragZone
    {flipDurationMs}
    dragZoneArea="optional"
    title="Optional"
    class=" "
  />
  <ControlDragZone
    {flipDurationMs}
    dragZoneArea="ignore"
    title="Ignore"
    class=""
  />
</div> -->
<div class=" w-full h-full flex flex-col  gap-y-4 overflow-y-auto">
  {#each $subjectList as { id, title, importance } (id)}
    <ControlSubjectItem
      {id}
      {title}
      {importance}
      onChange={handleSubjectListChange}
    />
  {/each}
</div>

<style>
  .ControlGrid {
    display: grid;
    grid-template-rows: minmax(6rem, 1fr) minmax(5rem, 2fr) minmax(5rem, 1fr);
  }
</style>
