<script lang="ts">
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import DataInput from "../components/DataInput.svelte";
  import LinkButton from "../components/LinkButton.svelte";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { graph } from "../utils/graph";
  import colors from "../utils/colors";
  import { api } from "../api";
  import ToggleColorModeButton from "../components/ToggleColorModeButton.svelte";
  import { loadSelectedSubjects, saveSelectedSubjects } from "../storage";
  import courseCommissionsStore from "../store/CourseCommissionsStore";
  import planStore from "../store/PlanStore";
  import type {
    Commissions,
    SubjectPlan,
  } from "@course-scheduler-app/scheduler-wasm";
  import LoadingSpinner from "../components/LoadingSpinner.svelte";
  import { svg } from "d3";

  let svgElem: Element;
  let simulation;

  let charge = 0,
    link = 0;

  let width: number, height: number;
  $: resizedSvg(width, height);
  function resizedSvg(width: number, height: number) {
    if (simulation !== undefined)
      simulation
        .force("center")
        .x(width / 2)
        .y(height / 2);
  }

  $: changeChargeStrength(charge);
  function changeChargeStrength(charge: number) {
    if (simulation !== undefined) simulation.force("charge").strength(charge);
  }

  $: changeLinkStrength(link);
  function changeLinkStrength(link: number) {
    if (simulation !== undefined) simulation.force("link").strength(link);
  }

  let selected: Set<string>;

  $: courseCommissions = $courseCommissionsStore;
  $: removeNonExistentInTerm($courseCommissionsStore, selected);

  function removeNonExistentInTerm(
    termSubjects: Commissions,
    selected: Set<string>
  ) {
    if (selected === undefined || termSubjects === null) {
      return;
    }
    for (const code of selected) {
      if (termSubjects.get_subject_info(code) === undefined) {
        console.log(
          `Subject with code ${code} was removed from selected because it's not on term's subjects.`
        );
        selected.delete(code);
      }
    }
    saveSelectedSubjects(selected);
  }

  $: $planStore !== null && svgElem !== undefined && planChanged($planStore);
  function planChanged(plan: SubjectPlan) {
    // console.log("Plan changed");
    const deselectedColor = colors[0];
    const selectedColor = colors[1];
    const subjects = plan.get_subjects();
    selected = loadSelectedSubjects();

    let nodes = subjects.map((code, i) => {
      const info = plan.get_subject_info(code);
      const node = {
        id: info.code,
        label: info.name,
        selected: selected.has(info.code),
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
      if (selected.has(code)) {
        selected.delete(code);
      } else if (courseCommissions.get_subject_info(code) !== undefined) {
        selected.add(code);
      }

      node.selected = selected.has(code);
      saveSelectedSubjects(selected);
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
