<script lang="ts">
  import type {
    Commissions,
    SubjectPlan,
  } from "@course-scheduler-app/scheduler-wasm";
  import type { Simulation, SimulationNodeDatum } from "d3";
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
  <div class="absolute left-5 top-5">
    <PlanSelector />
  </div>
  <div class="absolute right-5 bottom-5">
    <LinkButton
      title="Start"
      link="Options"
      icon="material-symbols:arrow-right-alt-rounded"
    />
  </div>
  <!-- <div
    class="absolute left-2 top-2 flex flex-col items-center w-fit h-fit bg-zone rounded-lg p-5"
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
  <ToggleColorModeButton class="absolute top-5 right-5 " />
</main>
