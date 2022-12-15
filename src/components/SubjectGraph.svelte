<script lang="ts">
  import type {
    Commissions,
    SubjectPlan,
  } from "@course-scheduler-app/scheduler-wasm";
  import type { Simulation, SimulationNodeDatum } from "d3";
  import PlanSelector from "src/components/PlanSelector.svelte";
  import selected, { toggleSubject } from "src/store/GraphSelectedStore";
  import LinkButton from "../components/LinkButton.svelte";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";
  import ToggleColorModeButton from "../components/ToggleColorModeButton.svelte";
  import courseCommissionsStore from "../store/CourseCommissionsStore";
  import planStore from "../store/PlanStore";
  import colors from "../utils/colors";
  import { graph } from "../utils/graph";

  let svgElem: Element;
  let simulation: Simulation<SimulationNodeDatum, undefined> | undefined;
  let width: number, height: number;

  $: simulation !== undefined && resizedSvg(width, height);
  function resizedSvg(width: number, height: number) {
    simulation.force("x").x(width / 2);
    simulation.force("y").y(height / 2);
    simulation.alpha(1);
    simulation.restart();
  }

  $: courseCommissions = $courseCommissionsStore;

  $: $planStore !== null && svgElem !== undefined && planChanged($planStore);
  function planChanged(plan: SubjectPlan) {
    var child = svgElem.lastElementChild;
    while (child) {
      svgElem.removeChild(child);
      child = svgElem.lastElementChild;
    }

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
      node.available =
        courseCommissions.get_subject_info(node.id) !== undefined;
    });
  }

  $: loading = $courseCommissionsStore === null || $planStore === null;
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg bind:this={svgElem} width="100%" height="100%" />
</div>
