import * as d3 from "d3";

export function graph(
  svgElement: Element,
  nodes: { id: string; label: string, selected: boolean }[],
  edges: { source: string; target: string }[],
  initialWidth: number,
  initialHeight: number,
  clickCallback: (node) => void
) {
  let N = d3.map(nodes, (n) => n.id);
  let LS = d3.map(edges, ({ source }) => source);
  let LE = d3.map(edges, ({ target }) => target);

  nodes = d3.map(nodes, (n, i) => ({
    id: N[i],
    label: n.label,
    selected: n.selected
  }));
  edges = d3.map(edges, (e, i) => ({ source: LS[i], target: LE[i] }));

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(initialWidth / 2, initialHeight / 2))
    .force(
      "link",
      d3
        .forceLink(edges)
        .id(({ index }) => {
          return N[index];
        })
        .strength(0.1)
    )

    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force(
      "collision",
      d3.forceCollide().radius((d) => 50)
    )
    .on("tick", ticked);

  let svg = d3.select(svgElement);
  svg
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -0.5)
    .attr("markerWidth", 3)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
    .append("path")
    .attr("fill", "black")
    .attr("d", "M0,-5L10,0L0,5");


  const edge = svg
    .append("g")
    .attr("class", "stroke-edge dark:stroke-edge-dark")
    // .attr("stroke", "red")
    .attr("stroke-width", 2)
    .selectAll("line")
    .data(edges)
    .join("line")
    .attr("marker-end", "url(#arrow)");

  const shadows = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 10);

  const node = svg
    .append("g")
    .selectAll("g")
    .attr("class", "group")
    .data(nodes)
    .join("g")
    .call(drag(simulation))
    .on("click", (_, node) => clickCallback(node));
  const rectWidth = 100;
  const rectHeight = 24;
  const rect = node
    .append("circle")
    .attr("paint-order", "stroke")
    .attr("stroke-width", "5px")
    .attr("r", 6);
  const text = node
    .append("text")
    .attr("paint-order", "stroke")
    .attr("dominant-baseline", "middle")
    .attr("class", "fill-text-dark dark:fill-text stroke-vertex dark:stroke-vertex-dark")
    .attr("stroke-width", "2px")
    .attr("font-size", "0.75em")
    .attr("width", 10)
    .attr("x", 17)
    .text((d) => d.label);

  function ticked() {
    shadows
      .attr("class", (d) => (d.selected ? "fill-accent" : "invisible" + " active:scale-[0.9] hover:scale-[1.1]"))
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
    node
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .select("circle")
      .attr("class", (d) => ((d.selected ? "fill-accent" : "fill-vertex-dark dark:fill-vertex") + "  stroke-vertex-ring dark:stroke-vertex-ring-dark active:fill-accent-dark active:scale-[0.9] hover:scale-[1.1] cursor-pointer"))

    node
      .select("text")
      .attr("class", (d) => ((d.selected ? "fill-accent" : "fill-text-dark dark:fill-text") + "  stroke-vertex-ring dark:stroke-vertex-ring-dark active:fill-accent-dark cursor-pointer"))
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

  return simulation;
}
