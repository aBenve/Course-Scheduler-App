<script lang="ts">
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";
  import type { Choice } from "scheduler-wasm";
  export let options: Choice[];
</script>

{#each options as option}
  <SubjectOptionItemList optionData={option} />
{/each}
