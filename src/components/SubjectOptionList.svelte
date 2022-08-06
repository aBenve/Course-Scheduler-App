<script lang="ts">
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";
  import options, { type QueryParameters } from "../store/OptionStore";
  import IntersectionObserver from "svelte-intersection-observer";

  let endOfList: HTMLElement;
</script>

<div
  class="w-full p-5 flex flex-col items-center justify-center"
>
  {#if $options.options.length > 0 || !$options.isComplete}
    <div
      class="gap-y-4 gap-x-4 grid grid-rows-[repeat(auto-fill,1fr)] grid-cols-[max-content_1fr] items-center"
    >
      {#each $options.options as option, i}
        <span
          class="font-medium text-center text-text-dark-secondary dark:text-text-secondary text-2xl opacity-30"
        >
          {i + 1}
        </span>
        <SubjectOptionItemList
          optionData={option}
          optionIndex={i}
          sortedSubjects={$options.sortedSubjects}
        />
      {/each}
    </div>
    {#if !$options.isComplete}
      <div class="mt-4">
        <IntersectionObserver
          element={endOfList}
          on:intersect={() => {
            console.log("Intersecting");
            options.addPage();
          }}
        >
          <div bind:this={endOfList}>Loading...</div>
        </IntersectionObserver>
      </div>
    {/if}
  {:else}
    <div class="text-center text-sm font-medium">No subjects available.</div>
  {/if}
</div>
