<script lang="ts">
  import selectedPlanStore from "src/store/SelectedPlanStore";
  import Dropdown from "./Dropdown.svelte";

  let selectedCareer: string = "Informatica";
  let selectedPlan: string;

  const careers = {
    Informatica: {
      plans: ["S10 - Rev", "S10 - Rev18", "S10 A - Rev18"],
    },
    Industrial: { plans: ["I22", "I-13", "I-13T", "I04", "I87/4"] },
    Electronica: {
      plans: ["K07-Rev.18", "K07A-Rev.18", "K12", "K12A", "K07", "K07A"],
    },
    Mecanica: {
      plans: [
        "M22 - Agosto",
        "M22-Marzo",
        "M09 - Rev18 (Agosto)",
        "M09 - Rev18 (Marzo)",
        "M 17 Agosto Rev 1",
        "M 17 Marzo Rev 1",
        "M17 Agosto",
        "M17 Marzo",
        "M13 agosto",
        "M13 marzo",
        "M13 marzo(N)",
        "M09 /2",
        "M09 A/2",
      ],
    },
  };

  $: selectedPlan =
    careers[selectedCareer].plans[careers[selectedCareer].plans.length - 1];

  $: $selectedPlanStore = selectedPlan;
</script>

<div class="flex items-center space-x-2">
  <Dropdown
    on:change={(option) => {
      selectedCareer = option.detail;
    }}
    options={Object.entries(careers).map(([key, value]) => key)}
    selectedOption={selectedCareer}
  />
  <Dropdown
    on:change={(option) => {
      selectedPlan = option.detail;
    }}
    options={careers[selectedCareer].plans}
    selectedOption={selectedPlan}
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
