<script lang="ts">
  import ControlSubjectItem from "./ControlSubjectItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  import subjects from "../store/SubjectStore";

  export let flipDurationMs;

  function handleOrderAndMove(e: any): void {
    subjects.update((currentSubjects) => {
      currentSubjects.mandatory = e.detail.items;
      return currentSubjects;
    });
  }
</script>

<section
  use:dndzone={{ items: $subjects.mandatory, flipDurationMs }}
  on:consider={handleOrderAndMove}
  on:finalize={handleOrderAndMove}
  class="bg-blue-600 w-full h-full flex flex-col  items-center rounded-lg overflow-y-auto p-2 gap-y-2"
>
  {#each $subjects.mandatory as { id, title } (id)}
    <div animate:flip={{ duration: flipDurationMs }} class="w-full">
      <ControlSubjectItem {title} />
    </div>
  {/each}
</section>
