<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import ControlSubjectItem from "./ControlSubjectItem.svelte";

  import finalizedSubjects from "../store/FinalizedSubjectsStore";
  import subjects from "../store/SubjectStore";

  export let flipDurationMs;

  let dragZoneStyle;

  function handleOrderAndMove(e: any): void {
    dragZoneStyle = {
      outline: "2px solid #00000050",
    };
    subjects.update((currentSubjects) => {
      let copiedSubs = currentSubjects;
      copiedSubs.ignore = e.detail.items;
      return copiedSubs;
    });
  }

  function onFinalize() {
    $finalizedSubjects = $subjects;
  }
</script>

<section
  use:dndzone={{
    items: $subjects.ignore,
    flipDurationMs,
    dropTargetStyle: dragZoneStyle,
  }}
  on:consider={handleOrderAndMove}
  on:finalize={handleOrderAndMove}
  class="bg-zone dark:bg-zone-dark dark:border-dark w-full h-1/2 flex flex-col  items-center rounded-lg overflow-y-auto p-2 gap-y-2 border border-solid border-zone"
>
  {#each $subjects.ignore as { id, title } (id)}
    <div animate:flip={{ duration: flipDurationMs }} class="w-full">
      <ControlSubjectItem {title} />
    </div>
  {/each}
</section>
