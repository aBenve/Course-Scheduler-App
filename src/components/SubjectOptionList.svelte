<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer";
  import { fade } from "svelte/transition";
  import { addPage, options } from "../store/OptionStore";
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";

  let endOfList: HTMLElement;

  let reachedEnd: boolean;
  // $: console.log($options);
  /*$: reachedEnd && options.addPage();*/
</script>

<div class="w-full p-3 flex flex-col items-center justify-center">
  {#if $options.values.length > 0 || !$options.done}
    <div
      class="w-full gap-y-2 gap-x-4 grid grid-rows-[repeat(auto-fill,1fr)] grid-cols-[max-content_1fr] items-center"
    >
      {#each $options.values as option, i}
        <span
          class="font-medium text-center text-text-dark-secondary dark:text-text-secondary text-2xl opacity-30 colorTransition"
        >
          {i + 1}
        </span>
        <div
          in:fade
          class="bg-area dark:bg-area-dark hover:bg-zone dark:hover:bg-zone-dark rounded-lg w-full overflow-x-auto border-solid  border-x-8 py-2 border-area dark:border-area-dark hover:border-zone hover:dark:border-zone-dark colorTransition"
        >
          <SubjectOptionItemList
            optionData={option}
            optionIndex={i}
            sortedSubjects={$options.sortedSubjects}
          />
        </div>
      {/each}
    </div>
    {#if !$options.done}
      <IntersectionObserver
        element={endOfList}
        on:intersect={() => {
          console.log("Intersecting");
          addPage();
        }}
        bind:intersecting={reachedEnd}
      >
        <div
          bind:this={endOfList}
          class="colorTransition text-text-dark dark:text-text"
        >
          Loading...
        </div>
      </IntersectionObserver>
    {/if}
  {:else}
    <span
      class="px-3 py-2 text-text-dark dark:text-text hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark rounded-lg colorTransition"
    >
      No subjects available.
    </span>
  {/if}
</div>
