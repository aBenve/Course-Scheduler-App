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
  export let showElectives: boolean;
  $: simulation !== undefined && resizedSvg(width, height);
  function resizedSvg(width: number, height: number) {
    simulation
      .force("x")
      .x(
        (node) =>
          (node.periodIndex !== undefined
            ? circleCenters[node.periodIndex].x
            : 0) +
          width / 2
      );
    simulation
      .force("y")
      .y(
        (node) =>
          (node.periodIndex !== undefined
            ? circleCenters[node.periodIndex].y
            : 0) +
          height / 2
      );
    simulation.alpha(1);
    simulation.restart();
  }

  $: courseCommissions = $courseCommissionsStore;

  let circleLayoutRadius = 300;
  let circleCenters: { x: number; y: number }[];

  $: $planStore !== null &&
    svgElem !== undefined &&
    planChanged($planStore, showElectives);
  function planChanged(plan: SubjectPlan, showElectives: boolean) {
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
      let terms = plan.get_subject_terms(code);
      let term = terms[0];
      let termIndex =
        term !== undefined
          ? (term.year - 1) * 2 + (term.period - 1)
          : undefined;
      const node = {
        id: info.code,
        periodIndex: termIndex,
        label: `${info.name}`,
      };
      info.free();
      return node;
    });
    if (!showElectives)
      nodes = nodes.filter((node) => node.periodIndex !== undefined);
    let maxTerm = nodes.reduce((prev, cur) =>
      (prev.periodIndex ?? -1) > (cur.periodIndex ?? -1) ? prev : cur
    ).periodIndex;
    let radius = circleLayoutRadius;
    if (showElectives) radius *= 2;
    circleCenters = [
      ...Array(maxTerm + 1)
        .fill(0)
        .map((_, i) => {
          let angle = (i / (maxTerm + 1)) * (Math.PI * 2);
          return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
          };
        }),
    ];
    //nodes.forEach((node) => {
    //if (node.periodIndex === undefined) {
    //node.periodIndex = maxTerm + 1;
    //}
    //});
    let edges = subjects
      .filter((sub) => nodes.find((n) => n.id == sub))
      .flatMap((code) =>
        plan
          .get_subject_dependencies(code)
          .filter((dep) => nodes.find((n) => n.id == dep))
          .map((dep) => ({ source: dep, target: code }))
      );

    simulation = graph(svgElem, nodes, edges, width, height, (node) => {
      const code = node.id;
      toggleSubject(code);
    });

    resizedSvg(width, height);
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
