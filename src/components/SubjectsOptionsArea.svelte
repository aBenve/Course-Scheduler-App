<script lang="ts">
  import { fly } from "svelte/transition";
  import { newSearch } from "../store/OptionStore";
  import SubjectOptionList from "./SubjectOptionList.svelte";
  import { options } from "../store/OptionStore";
  import Badge from "./Badge.svelte";
  import ToggleColorModeButton from "./ToggleColorModeButton.svelte";

  let scrollable;

  function onNewSearch() {
    if (scrollable) {
      scrollable.scrollTop = 0;
    }
  }

  $: {
    onNewSearch($newSearch);
  }

  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <!-- <div
    bind:this={scrollable}
    in:fly={{ y: -10, duration: 500, delay: 350 }}
    class="bg-area dark:bg-area-dark relative  rounded-lg h-full overflow-auto border-8 border-solid border-area dark:border-area-dark"
  >
    <SubjectOptionList />
  </div> -->
  <!-- <div
    bind:this={scrollable}
    in:fly={{ y: -10, duration: 500, delay: 350 }}
    class="bg-area dark:bg-area-dark relative  rounded-lg h-full overflow-auto border-8 border-solid border-area dark:border-area-dark colorTransition"
  >
    <SubjectOptionList />
  </div> -->
  <div
    bind:this={scrollable}
    in:fly={{ y: -10, duration: 500, delay: 350 }}
    class=" relative h-full  colorTransition flex flex-col space-y-4"
  >
    <div class="flex items-center justify-between">
      <span class="flex items-center space-x-2 w-full">
        <span class="text-text-dark dark:text-text text-lg ">Options </span>
        <Badge title={$options.values.length + ($options.done ? "" : "+")} />
      </span>
      <ToggleColorModeButton class="" />
    </div>

    <SubjectOptionList />
  </div>
</div>
