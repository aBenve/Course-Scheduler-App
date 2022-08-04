<script lang="ts">
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";
  import type { Choice } from "scheduler-wasm";
  import options from "../store/OptionStore";
</script>

<div
  class="w-full p-5 gap-y-4 gap-x-4 grid grid-rows-[repeat(auto-fill,1fr)] grid-cols-[max-content_1fr] items-center  "
>
  {#each $options.options as option, i}
    <span
      class="font-medium text-center text-text-dark-secondary dark:text-text-secondary  text-2xl opacity-30 "
    >
      {i}
    </span>
    <SubjectOptionItemList
      optionData={option}
      optionIndex={i}
      sortedSubjects={$options.sortedSubjects}
    />
  {:else}
    <div class="text-center text-sm font-medium">No subjects available.</div>
  {/each}
</div>
