import * as d3 from "d3";

export function graph(
  svgElement: Element,
  nodes: { id: string; label: string }[],
  edges: { source: string; target: string }[],
  initialWidth: number,
  initialHeight: number
) {
  let N = d3.map(nodes, (n) => n.id);
  let LS = d3.map(edges, ({ source }) => source);
  let LE = d3.map(edges, ({ target }) => target);

  nodes = d3.map(nodes, (n, i) => ({ id: N[i], label: n.label }));
  edges = d3.map(edges, (e, i) => ({ source: LS[i], target: LE[i] }));

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
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("fill", "white")
    .attr("stroke", "black")
    .call(drag(simulation));
  const rectWidth = 100;
  const rectHeight = 24;
  const rect = node
    .append("rect")
    .attr("rx", 15)
    .attr("transform", `translate(${-rectWidth / 2}, ${-rectHeight / 2})`)
    .attr("width", rectWidth)
    .attr("height", rectHeight);
  const text = node
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "black")
    .attr("stroke-width", "0px")
    .attr("width", 10)
    .text((d) => d.label);

  function ticked() {
    node.attr("transform", function (d) {
      return `translate(${d.x},${d.y})`;
    });

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
