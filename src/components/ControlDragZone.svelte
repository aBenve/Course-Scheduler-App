<script lang="ts">
  import ControlSubjectItem from "./ControlSubjectItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  import subjects from "../store/SubjectStore";

  export let flipDurationMs;
  export let dragZoneArea;
  export let title;
  let dragZoneStyle;

  let clazz: string;
  export { clazz as class };

  function handleOrderAndMove(e: any): void {
    dragZoneStyle = {
      outline: "0px solid #00000050", // might change
    };
    subjects.update((currentSubjects) => {
      currentSubjects[dragZoneArea] = e.detail.items;
      return currentSubjects;
    });
  }
</script>

<div class="{clazz} flex flex-col">
  <span class="mb-2 text-xs text-text-dark-secondary dark:text-text-secondary"
    >{title}</span
  >
  <section
    use:dndzone={{
      items: $subjects[dragZoneArea],
      flipDurationMs,
      dropTargetStyle: dragZoneStyle,
    }}
    on:consider={handleOrderAndMove}
    on:finalize={handleOrderAndMove}
    class="bg-zone dark:bg-zone-dark w-full h-full flex flex-col min-h-[4em] items-center rounded-lg overflow-y-auto p-2 gap-y-2  "
  >
    {#each $subjects[dragZoneArea] as { id, title } (id)}
      <div animate:flip={{ duration: flipDurationMs }} class="w-full">
        <ControlSubjectItem {title} />
      </div>
    {/each}
  </section>
</div>
