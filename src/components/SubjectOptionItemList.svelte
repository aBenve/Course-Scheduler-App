<script lang="ts">
  import SubjectOptionItem from "./SubjectOptionItem.svelte";
  import type { Choice } from "@course-scheduler-app/scheduler-wasm";
  import { slide } from "svelte/transition";
  // import subjects from "../store/SubjectStore";
  import selectedOption from "../store/SelectedOptionStore";
  import colors from "../utils/colors";
  export let optionData: Choice;
  export let optionIndex: number;
  export let sortedSubjects: string[];

  $: selected = $selectedOption == optionIndex;
</script>

<!-- <div
  class="bg-zone dark:bg-zone-dark hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark h-fit w-fit p-2 rounded-lg flex gap-x-2  cursor-pointer items-center"
  on:click={() => ($selectedOption = optionIndex)}
> -->
<div
  class=" h-fit flex gap-x-2  cursor-pointer items-center"
  on:click={() => ($selectedOption = optionIndex)}
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
        commission={subject.commission}
      />
    </div>
  {/each}
</div>
