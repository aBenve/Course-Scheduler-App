<script lang="ts">
  import SubjectOptionList from "./SubjectOptionList.svelte";
  import { fly } from "svelte/transition";
  import { newSearch } from "../store/OptionStore";

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
  <div
    bind:this={scrollable}
    in:fly={{ y: -10, duration: 500, delay: 350 }}
    class="bg-area dark:bg-area-dark relative  rounded-lg h-full overflow-auto border-8 border-solid border-area dark:border-area-dark"
  >
    <SubjectOptionList />
  </div>
</div>
