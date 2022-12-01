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
  import {loadSelectedSubjects, saveSelectedSubjects} from "../storage";

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

  onMount(async () => {
    const deselectedColor = colors[0];
    const selectedColor = colors[1];
    const plan = await api.get_plan_from_api("S10 A - Rev18");
    const subjects = plan.get_subjects();
    let selected = loadSelectedSubjects();
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
        node.selected = false;
        selected.delete(code);
      } else {
        node.selected = true;
        selected.add(code);
      }
      saveSelectedSubjects(selected);
    });
    plan.free();
  });
</script>

<main
  class="flex justify-center items-center h-screen bg-background dark:bg-background-dark "
>
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
