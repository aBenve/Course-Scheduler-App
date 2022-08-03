<script lang="ts">
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";
  import type { Choice } from "scheduler-wasm";
  import options from "../store/OptionStore";
</script>

<div class="h-full w-full p-5 flex flex-col gap-y-4 ">
  {#each $options.options as option, i}
    <div class="w-full flex items-center gap-x-4">
      <span class="font-medium text-gray-300 text-2xl">
        {i}
      </span>
      <SubjectOptionItemList
        optionData={option}
        optionIndex={i}
        sortedSubjects={$options.sortedSubjects}
      />
    </div>
  {:else}
    <div class="text-center text-sm font-medium">No subjects available.</div>
  {/each}
</div>
