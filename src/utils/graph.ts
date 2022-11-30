import * as d3 from "d3";

export function graph(
  svgElement: Element,
  nodes: { id: string; label: string }[],
  edges: { source: string; target: string }[],
  initialWidth: number,
  initialHeight: number,
) {
  let N = d3.map(nodes, (n) => n.id);
  let LS = d3.map(edges, ({ source }) => source);
  let LE = d3.map(edges, ({ target }) => target);

  nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
  edges = d3.map(edges, (_, i) => ({ source: LS[i], target: LE[i] }));

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(initialWidth / 2, initialHeight / 2))
    .force(
      "link",
      d3
        .forceLink(edges)
        .id(({ index }) => {
          return N[index];
        })
        .strength(1)
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

  let svg = d3.select(svgElement);
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

  return simulation;
}
