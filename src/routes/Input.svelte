<script lang="ts">
  import type {
  Commissions,
    SubjectPlan
  } from "@course-scheduler-app/scheduler-wasm";
  import type { Simulation, SimulationNodeDatum } from "d3";
  import selected, {
    toggleSubject
  } from "src/store/GraphSelectedStore";
  import LinkButton from "../components/LinkButton.svelte";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";
  import ToggleColorModeButton from "../components/ToggleColorModeButton.svelte";
  import courseCommissionsStore from "../store/CourseCommissionsStore";
  import planStore from "../store/PlanStore";
  import colors from "../utils/colors";
  import { graph } from "../utils/graph";

  let svgElem: Element;
  let simulation: Simulation<SimulationNodeDatum, undefined> | undefined;

  let charge = 0,
    link = 0;

  let width: number, height: number;
  $: simulation !== undefined && resizedSvg(width, height);
  function resizedSvg(width: number, height: number) {
    simulation.force("x").x(width / 2);
    simulation.force("y").y(height / 2);
    simulation.alpha(1);
  }

  $: changeChargeStrength(charge);
  function changeChargeStrength(charge: number) {
    if (simulation !== undefined) simulation.force("charge").strength(charge);
  }

  $: changeLinkStrength(link);
  function changeLinkStrength(link: number) {
    if (simulation !== undefined) simulation.force("link").strength(link);
  }

  $: courseCommissions = $courseCommissionsStore;

  $: $planStore !== null && svgElem !== undefined && planChanged($planStore);
  function planChanged(plan: SubjectPlan) {
    // console.log("Plan changed");
    const deselectedColor = colors[0];
    const selectedColor = colors[1];
    const subjects = plan.get_subjects();

    let nodes = subjects.map((code, i) => {
      const info = plan.get_subject_info(code);
      const node = {
        id: info.code,
        label: info.name,
      };
      info.free();
      return node;
    });
    let edges = subjects.flatMap((code) =>
      plan
        .get_subject_dependencies(code)
        .map((dep) => ({ source: dep, target: code }))
    );

    simulation = graph(svgElem, nodes, edges, width, height, (node) => {
      const code = node.id;
      toggleSubject(code);
    });
  }

  $: simulation !== undefined &&
    $selected !== null &&
    selectedChanged($selected);

  function selectedChanged(selected: Set<string>) {
    simulation.nodes().forEach((node) => {
      node.selected = selected.has(node.id);
    });
  }

  $: simulation !== undefined &&
    $courseCommissionsStore !== null &&
    courseCommissionsChanged($courseCommissionsStore);

  function courseCommissionsChanged(courseCommissions: Commissions) {
    simulation.nodes().forEach((node) => {
      node.available = courseCommissions.get_subject_info(node.id) !== undefined;
    });
  }

  $: loading = $courseCommissionsStore === null || $planStore === null;
</script>

<main
  class="flex justify-center items-center h-screen bg-background dark:bg-background-dark colorTransition"
>
  {#if loading}
    <div class="absolute inset-0 flex bg-black/50 items-center justify-center">
      <LoadingSpinner />
    </div>
  {:else}
    <div
      class="w-full h-full"
      bind:clientWidth={width}
      bind:clientHeight={height}
    >
      <svg bind:this={svgElem} width="100%" height="100%" />
    </div>
    <div class="absolute right-2 bottom-2">
      <LinkButton title="Start" link="Options" />
    </div>
  {/if}
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
  <ToggleColorModeButton />
</main>
