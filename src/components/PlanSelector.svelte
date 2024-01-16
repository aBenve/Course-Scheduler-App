<script lang="ts">
  import selectedPlanStore from "src/store/SelectedPlanStore";
  import Dropdown from "./Dropdown.svelte";

  export let careers: string;

  export let defaultCareer: string;

  let selectedCareer: string;

  if ($selectedPlanStore === undefined) {
    selectedCareer = defaultCareer;
    $selectedPlanStore = careers[selectedCareer][0];
  } else {
    selectedCareer = Object.entries(careers).find(([career, plans]) =>
      plans.includes($selectedPlanStore)
    )[0];
  }
</script>

<div class="flex items-center space-x-2">
  <Dropdown
    on:change={(option) => {
      selectedCareer = option.detail;
      $selectedPlanStore = careers[selectedCareer][0];
    }}
    options={Object.keys(careers)}
    selectedOption={selectedCareer}
  />
  <Dropdown
    on:change={(option) => {
      $selectedPlanStore = option.detail;
    }}
    options={careers[selectedCareer]}
    selectedOption={$selectedPlanStore}
  />
</div>
