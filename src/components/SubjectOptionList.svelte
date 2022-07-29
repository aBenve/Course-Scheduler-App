<script lang="ts">
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";
  import type { Choice } from "scheduler-wasm";
  import options from "../store/OptionStore";

  $: correctOrder = [
    ...$options.parameters.mandatory,
    ...$options.parameters.optional,
  ];
</script>

{#each $options.options as option, i}
  <div class="w-full">
    <SubjectOptionItemList
      optionData={option}
      optionIndex={i}
      subjectOrder={correctOrder}
    />
  </div>
{/each}
