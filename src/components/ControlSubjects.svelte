<script lang="ts">
  import ControlSubjectItem from "./ControlSubjectItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  let items = [
    { id: 1, name: "item1" },
    { id: 2, name: "item2" },
    { id: 3, name: "item3" },
    { id: 4, name: "item4" },
  ];

  const flipDurationMs = 300;
  function handleDndConsider(e: any): void {
    items = e.detail.items;
  }
  function handleDndFinalize(e: any): void {
    items = e.detail.items;
  }
</script>

<section
  use:dndzone={{ items, flipDurationMs }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
  class="bg-blue-600 w-full h-full flex flex-col  items-center rounded-lg overflow-y-auto p-2 gap-y-2"
>
  {#each items as item (item.id)}
    <div animate:flip={{ duration: flipDurationMs }} class="w-full">
      <ControlSubjectItem title={item.name} />
    </div>
  {/each}
</section>
