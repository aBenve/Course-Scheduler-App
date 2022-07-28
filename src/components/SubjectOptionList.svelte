<script lang="ts">
  import SubjectOptionItemList from "./SubjectOptionItemList.svelte";
  import type { Choice } from "scheduler-wasm";
  let option: Choice = {
    subjects: {
      "01.01": {
        name: "Analisis II",
        credits: 0,
        commission: "A",
      },
    },
  };
</script>

{#each Array(10) as _}
  <SubjectOptionItemList optionData={option} />
{/each}
