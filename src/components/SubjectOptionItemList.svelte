<script lang="ts">
  import SubjectOptionItem from "./SubjectOptionItem.svelte";
  import type { Choice } from "scheduler-wasm";
  // import subjects from "../store/SubjectStore";
  import selectedOption from "../store/SelectedOptionStore";
  import { sortedSubjects } from "../store/OptionStore";
  import colors from "../utils/colors";
  export let optionData: Choice;
  export let optionIndex: number;

  $: selected = $selectedOption == optionIndex;
</script>

<div
  class="bg-zone dark:bg-zone-dark h-fit w-full p-2 rounded-lg flex gap-x-2  cursor-pointer overflow-x-auto items-center"
  on:click={() => selectedOption.set(optionIndex)}
>
  {#each Object.entries(optionData.subjects).sort( ([codeA, _1], [codeB, _2]) => {
      let indexA = $sortedSubjects.indexOf(codeA);
      let indexB = $sortedSubjects.indexOf(codeB);
      if (indexA == -1 || indexB == -1) throw `Subject not found: ${codeA} = [${indexA}], ${codeB} = [${indexB}]`;
      return indexA - indexB;
    } ) as [code, subject], i}
    <SubjectOptionItem
      toggle={selected}
      color={colors[i]}
      subject={subject.name}
      commission={subject.commission}
    />
  {/each}
</div>
