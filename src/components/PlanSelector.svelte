<script lang="ts">
  import selectedPlanStore from "src/store/SelectedPlanStore";
  import Dropdown from "./Dropdown.svelte";

  export let careers: string;

  export let defaultCareer: string;

  let selectedCareer: string;

  if ($selectedPlanStore === null) {
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
  <!-- 
  <div
    class="relative flex items-center bg-zone dark:bg-zone-dark w-fit px-3 py-2 rounded-lg"
  >
    <span class="text-sm text-text-dark dark:text-text">Career </span>
    <button
      on:click={() => {
        isOpenCareer = !isOpenCareer;
        isOpenPlan = false;
      }}
      class=" text-text-dark dark:text-text text-xs block w-full px-2 py-1 ml-2 colorTransition bg-accent bg-opacity-50 text-accent rounded-lg "
      >{careers[selectedCareer].name}
    </button>
    {#if isOpenCareer}
      <div
        class="flex flex-col space-y-2 absolute bg-area dark:bg-area-dark colorTransition bg-opacity-50 p-2 rounded-lg left-full top-0 ml-2"
      >
        {#each Object.entries(careers) as [key, value]}
          <button
            on:click={() => {
              selectedCareer = key;
              isOpenCareer = false;
            }}
            class="bg-zone dark:bg-zone-dark text-text-dark dark:text-text text-sm rounded-lg block w-full p-2 colorTransition hover:bg-accent hover:bg-opacity-50"
            >{value.name}</button
          >
        {/each}
      </div>
    {/if}
  </div>
  <div
    class="relative flex items-center bg-zone dark:bg-zone-dark w-fit px-3 py-2 rounded-lg"
  >
    <span class="text-sm text-text-dark dark:text-text">Plan </span>

    <button
      on:click={() => {
        isOpenPlan = !isOpenPlan;
        isOpenCareer = false;
      }}
      class=" text-text-dark dark:text-text text-xs block w-full px-2 py-1 ml-2 colorTransition bg-accent bg-opacity-50 text-accent rounded-lg "
      >{selectedPlan}</button
    >
    {#if isOpenPlan}
      <div
        class="flex flex-col space-y-2 absolute bg-area bg-opacity-50 p-2 rounded-lg left-full top-0 ml-2 w-full"
      >
        {#each careers[selectedCareer].plans as plan}
          <button
            on:click={() => {
              selectedPlan = plan;
              isOpenPlan = false;
            }}
            class="bg-zone dark:bg-zone-dark text-text-dark dark:text-text text-sm rounded-lg block w-full p-2 colorTransition hover:bg-accent hover:bg-opacity-50"
            >{plan}</button
          >
        {/each}
      </div>
    {/if}
  </div>
    -->
</div>
