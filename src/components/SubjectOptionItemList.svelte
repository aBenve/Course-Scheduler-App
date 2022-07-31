<script lang="ts">
  import SubjectOptionItem from "./SubjectOptionItem.svelte";
  import type { Choice } from "scheduler-wasm";
  // import subjects from "../store/SubjectStore";
  import selectedOption from "../store/SelectedOptionStore";
  import colors from "../utils/colors";
  export let optionData: Choice;
  export let optionIndex: number;

  export let subjectOrder: string[];

  $: selected = $selectedOption == optionIndex;
  // $: console.log("complete: ", correctOrder);
</script>

<div
  class="{selected
    ? 'bg-gray-900'
    : 'bg-gray-200'} h-fit p-2 rounded-lg flex gap-x-2  cursor-pointer overflow-x-scroll"
  on:click={() => selectedOption.set(optionIndex)}
>
  {#each Object.entries(optionData.subjects).sort( ([codeA, _1], [codeB, _2]) => {
      let indexA = subjectOrder.indexOf(codeA);
      let indexB = subjectOrder.indexOf(codeB);
      if (indexA == -1 || indexB == -1) throw `Subject not found: ${codeA} = [${indexA}], ${codeB} = [${indexB}]`;
      return indexA - indexB;
    } ) as [code, subject], i}
    <SubjectOptionItem
      toggle={selected}
      color={colors[i]}
      subject={subject.name}
      commission={subject.commission}
    />
  {:else}
    <div class="text-center text-sm font-medium">No subjects available.</div>
  {/each}
</div>
