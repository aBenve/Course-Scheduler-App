<script lang="ts">
  import SubjectOptionItem from "./SubjectOptionItem.svelte";
  import type {Choice} from "scheduler-wasm";
  export let optionData: Choice;
</script>

<div
  class="bg-blue-600 h-fit p-2 w-full rounded-lg flex gap-x-2 hover:bg-purple-500 cursor-pointer "
>
  {#each Object.values(optionData.subjects) as subject}
    <SubjectOptionItem color="red" subject={subject.name} />
  {/each}
</div>
