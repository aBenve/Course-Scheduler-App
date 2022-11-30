<script lang="ts">
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import DataInput from "../components/DataInput.svelte";
  import LinkButton from "../components/LinkButton.svelte";
  import { fade, fly } from "svelte/transition";
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { check_outros } from "svelte/internal";

  let svgElem;
  let svg;
  let simulation;

  let charge = 0,
    link = 0;

  let width: number, height: number;
  $: resizedSvg(width, height);
  function resizedSvg(width: number, height: number) {
    console.log(simulation, width, height);

    if (simulation !== undefined)
      simulation
        .force("center")
        .x(width / 2)
        .y(height / 2);
  }

  onMount(() => {
    let nodes = new Array(8).fill(0).map((_, i) => ({
      id: i,
    }));
    let edges = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
      { source: 6, target: 7 },
    ];
    let N = d3.map(nodes, (n) => n.id);
    let LS = d3.map(edges, ({ source }) => source);
    let LE = d3.map(edges, ({ target }) => target);

    nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
    edges = d3.map(edges, (_, i) => ({ source: LS[i], target: LE[i] }));

    console.log(nodes);
    console.log(edges);

    simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(charge))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "link",
        d3
          .forceLink(edges)
          .id(({ index }) => {
            return N[index];
          })
          .strength(link)
      )

      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force(
        "collision",
        d3.forceCollide().radius(function (d) {
          return 75;
        })
      )
      .on("tick", ticked);

    svg = d3.select(svgElem);
    const edge = svg
      .append("g")
      .attr("stroke", "yellow")
      .attr("stroke-width", 5)
      .selectAll("line")
      .data(edges)
      .join("line");
    const node = svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("rx", 15)
      .attr("transform", "translate(-50,-50)")
      .attr("width", 100)
      .attr("height", 100);

    function ticked() {
      node
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .call(drag(simulation));

      edge
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
    }

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
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
  <div
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
  </div>
</main>
