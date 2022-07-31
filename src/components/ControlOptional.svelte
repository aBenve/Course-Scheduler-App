<script lang="ts">
  import ControlSubjectItem from "./ControlSubjectItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  import subjects from "../store/SubjectStore";

  export let flipDurationMs;

  let dragZoneStyle;

  function handleOrderAndMove(e: any): void {
    dragZoneStyle = {
      outline: "2px solid #00000050",
    };
    subjects.update((currentSubjects) => {
      let copiedSubs = currentSubjects;
      copiedSubs.optional = e.detail.items;
      return copiedSubs;
    });
  }
</script>

<section
  use:dndzone={{
    items: $subjects.optional,
    flipDurationMs,
    dropTargetStyle: dragZoneStyle,
  }}
  on:consider={handleOrderAndMove}
  on:finalize={handleOrderAndMove}
  class="bg-zone  w-full h-1/2 flex flex-col  items-center rounded-lg overflow-y-auto p-2 gap-y-2 border border-solid border-zone"
>
  {#each $subjects.optional as { id, title } (id)}
    <div animate:flip={{ duration: flipDurationMs }} class="w-full">
      <ControlSubjectItem {title} />
    </div>
  {/each}
</section>
