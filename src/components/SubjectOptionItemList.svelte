<script lang="ts">
  import type { Choice } from "@course-scheduler-app/scheduler-wasm";
  import { slide } from "svelte/transition";
  import SubjectOptionItem from "./SubjectOptionItem.svelte";

  // import subjects from "../store/SubjectStore";
  import { selectedOptionIndex } from "../store/SelectedOptionIndices";
  import { fade } from "svelte/transition";

  import colors from "../utils/colors";
  export let optionData: Choice;
  export let optionIndex: number;
  export let sortedSubjects: string[];

  $: selected = $selectedOptionIndex === optionIndex;
</script>

<!-- <div
  class="bg-zone dark:bg-zone-dark hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark h-fit w-fit p-2 rounded-lg flex gap-x-2  cursor-pointer items-center"
  on:click={() => ($selectedOption = optionIndex)}
> -->
<div
  in:fade
  class="{selected
    ? 'bg-zone dark:bg-zone-dark'
    : 'bg-area dark:bg-area-dark'}  hover:bg-zone dark:hover:bg-zone-dark rounded-2xl w-full overflow-y-auto   colorTransition"
>
  <div
    class=" h-fit flex flex-col gap-y-2 p-4  cursor-pointer items-start"
    on:click={() => selectedOptionIndex.next(optionIndex)}
  >
    {#each Array.from(optionData.subjects.entries()).sort( ([codeA, _1], [codeB, _2]) => {
        let indexA = sortedSubjects.indexOf(codeA);
        let indexB = sortedSubjects.indexOf(codeB);
        if (indexA == -1 || indexB == -1) throw `Subject not found: ${codeA} = [${indexA}], ${codeB} = [${indexB}]`;
        return indexA - indexB;
      } ) as [code, subject], i}
      <div transition:slide|local>
        <SubjectOptionItem
          toggle={selected}
          color={colors[i]}
          subject={subject.name}
          commissions={subject.commissions}
        />
      </div>
    {/each}
    <span
      class="text-sm  font-medium colorTransition w-full flex justify-end text-text-terciary"
      >{optionIndex}</span
    >
  </div>
</div>
