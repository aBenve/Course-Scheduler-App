<script lang="ts">
  import type {
    Commissions,
    SubjectPlan,
  } from "@course-scheduler-app/scheduler-wasm";
  import type { Simulation, SimulationNodeDatum } from "d3";
  import ButtonWithIcon from "src/components/ButtonWithIcon.svelte";
  import PlanSelector from "src/components/PlanSelector.svelte";
  import SubjectGraph from "src/components/SubjectGraph.svelte";
  import selected, { toggleSubject } from "src/store/GraphSelectedStore";
  import LinkButton from "../components/LinkButton.svelte";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";
  import ToggleColorModeButton from "../components/ToggleColorModeButton.svelte";
  import courseCommissionsStore from "../store/CourseCommissionsStore";
  import planStore from "../store/PlanStore";
  import colors from "../utils/colors";
  import { graph } from "../utils/graph";

  let showElectives = false;

  $: loading = $courseCommissionsStore === null || $planStore === null;
</script>

<main
  class="flex justify-center items-center h-screen bg-background dark:bg-background-dark colorTransition"
>
  {#if loading}
    <!--<div class="absolute inset-0 flex bg-black/50 items-center justify-center">-->
    <LoadingSpinner />
    <!--</div>-->
  {:else}
    <SubjectGraph />
  {/if}
  <div class="absolute left-4 top-4">
    <PlanSelector />
  </div>
  <div class="absolute right-4 bottom-4">
    <LinkButton
      title="Start"
      link="Options"
      icon="material-symbols:arrow-right-alt-rounded"
    />
  </div>
  <!-- <div
    class="absolute left-2 top-2 flex flex-col items-center w-fit h-fit bg-zone rounded-lg p-4"
  >
    <label for="charge">Charge</label>

    <div class="flex items-center space-x-4">
      <input
        id="charge"
        type="range"
        min={-1000}
        max={1000}
        bind:value={charge}
      />
      <span>{charge}</span>
    </div>

    <label for="link">Link</label>
    <div class="flex items-center space-x-4">
      <input id="link" type="range" min={-1000} max={1000} bind:value={link} />
      <span>{link}</span>
    </div>
  </div> -->

  <div class="absolute top-4 right-4 flex gap-3">
    <button
      on:click={() => {
        showElectives = !showElectives;
      }}
      class="flex space-x-2 items-center hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark hover:bg-opacity-50 p-2 rounded-lg py-2 px-3 "
    >
      <ButtonWithIcon
        icon={showElectives
          ? "material-symbols:check-box-outline"
          : "material-symbols:check-box-outline-blank"}
        iconWidth="15"
        iconHeight="15"
        iconStyles="text-text-dark dark:text-text"
        textStyles="text-text-dark dark:text-text text-xs"
        title="Electives"
      />
    </button>
    <ToggleColorModeButton />
  </div>
</main>
