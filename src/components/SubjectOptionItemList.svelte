<script lang="ts">
  import SubjectOptionItem from "./SubjectOptionItem.svelte";
  import type { Choice } from "scheduler-wasm";
  // import subjects from "../store/SubjectStore";
  import selectedOption from "../store/SelectedOptionStore";
  import options from "../store/OptionStore";
  export let optionData: Choice;
  export let optionIndex: number;

  export let subjectOrder: string[];

  $: selected = $selectedOption == optionIndex;
  // $: console.log("complete: ", correctOrder);
</script>

<div
  class="{selected
    ? 'bg-orange-900'
    : 'bg-blue-600'} h-fit p-2 rounded-lg flex gap-x-2 overflow-x-scroll hover:bg-purple-500 cursor-pointer "
  on:click={() => selectedOption.set(optionIndex)}
>
  {#each Object.entries(optionData.subjects).sort( ([codeA, _1], [codeB, _2]) => {
      let indexA = subjectOrder.indexOf(codeA);
      let indexB = subjectOrder.indexOf(codeB);
      if (indexA == -1 || indexB == -1) throw `Subject not found: ${codeA} = [${indexA}], ${codeB} = [${indexB}]`;
      return indexA - indexB;
    } ) as [code, subject]}
    <SubjectOptionItem
      color="red"
      subject={subject.name}
      commission={subject.commission}
    />
  {:else}
    <div class="text-center text-sm font-medium">No subjects available.</div>
  {/each}
</div>
