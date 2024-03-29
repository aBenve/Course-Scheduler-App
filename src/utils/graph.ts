import * as d3 from "d3";

export function graph(
  svgElement: Element,
  nodes: {
    id: string;
    label: string;
    selected: boolean;
    available: boolean;
    periodIndex: number;
  }[],
  edges: { source: string; target: string }[],
  initialWidth: number,
  initialHeight: number,
  clickCallback: (node) => void
): d3.Simulation<d3.SimulationNodeDatum, undefined> {
  let N = d3.map(nodes, (n) => n.id);
  let LS = d3.map(edges, ({ source }) => source);
  let LE = d3.map(edges, ({ target }) => target);

  nodes = d3.map(nodes, (n, i) => ({
    id: N[i],
    label: n.label,
    selected: n.selected,
    available: n.available,
    periodIndex: n.periodIndex,
  }));
  edges = d3.map(edges, (e, i) => ({ source: LS[i], target: LE[i] }));

  let periodForce = 0.6;
  
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(edges)
        .id(({ index }) => {
          return N[index];
        })
        .strength(0.05)
    )
    .force("x", d3.forceX(initialWidth / 2).strength(node => node.periodIndex === undefined ? periodForce / 5 : periodForce))
    .force("y", d3.forceY(initialHeight / 2).strength(node => node.periodIndex === undefined ? periodForce / 5 : periodForce))
    .force("collision", d3.forceCollide().radius(20).strength(0.5))
    .force("charge", d3.forceManyBody().strength(-300))
    // .force("center", d3.forceCenter(initialWidth / 2, initialHeight / 2))
    .on("tick", ticked);

  //simulation.nodes().push({id: "12.34", label: "HOLA", selected: false, available: true, vx: 0, vy: 0, x: 0, y: 0})

  function handleZoom(e) {
    d3.select("svg g").attr("transform", e.transform);
  }

  let isDragging = false;

  const circleClasses = (d) => {
    return (
      (d.selected
        ? "fill-accent"
        : !d.available
        ? "fill-edge dark:fill-edge-dark"
        : "fill-vertex-dark dark:fill-vertex") +
      "  stroke-vertex-ring dark:stroke-vertex-ring-dark active:scale-[0.9] hover:scale-[1.1] cursor-pointer colorTransition"
    );
  };

  const textClasses = (d) => {
    return (
      (d.selected
        ? "fill-accent font-medium translate-y-1"
        : !d.available
        ? "fill-edge dark:fill-edge-dark"
        : "fill-text-dark dark:fill-text") +
      "  stroke-vertex-ring dark:stroke-vertex-ring-dark cursor-pointer colorTransition"
    );
  };

  const shadowClasses = (d) => {
    return d.selected
      ? "stroke-accent fill-transparent"
      : "invisible" + " active:scale-[0.9] hover:scale-[1.1] colorTransition";
  };

  const releaseHover = (_, nd) => {
    node.filter((n) => n.id !== nd.id).attr("style", "opacity: 1");
    shadows.attr("style", "opacity: 1");
    edge.attr("style", "opacity: 1").attr("marker-end", "url(#arrow)");
    text.attr("style", "opacity: 1");
  };

  let svg = d3
    .select(svgElement)
    .call(d3.zoom().on("zoom", handleZoom))
    .append("g");

  const marker = svg
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 0 10 5")
    .attr("refX", 12.5)
    .attr("refY", 2.5)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("class", "fill-edge dark:fill-edge-dark colorTransition")
    .attr("d", "M 0 0 L 10 2.5 L 0 5 z");

  // Clone the arrow marker and changes color.
  const arrowHighlight = d3.select(marker.node().parentElement).clone(true);
  arrowHighlight
    .attr("id", "arrow-highlight")
    .select("path")
    .attr("style", "fill: #5375F3;");

  const edge = svg
    .append("g")
    .attr("class", "stroke-edge dark:stroke-edge-dark colorTransition")
    // .attr("stroke", "red")
    .attr("stroke-width", 2)
    .selectAll("line")
    .data(edges)
    .join("line")
    .attr("id", "edge")
    .attr("marker-end", "url(#arrow)");

  const shadows = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 10)
    .attr("id", "shadow")
    .attr("stroke-width", "2px");

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
    .attr("id", "node")
    .attr("r", 6)
    .on("mouseover", (_, nd) => {
      if (!isDragging) {
        const transition = "transition: all 0.2s 0.2s ease-in-out";
        node
          .filter((n) => n.id !== nd.id)
          .attr("style", "opacity: 0.3; " + transition);
        shadows
          .filter((n) => n.id !== nd.id)
          .attr("style", "opacity: 0.3; " + transition);
        edge
          .filter((e) => e.source.id !== nd.id && e.target.id !== nd.id)
          .attr("style", "opacity: 0; " + transition);
        // edge
        //   .filter((e) => e.source.id === nd.id || e.target.id === nd.id)
        //   .attr("style", "stroke: #5375F3; " + transition)
        //   .attr("marker-end", "url(#arrow-highlight)");

        text
          .filter((n) => n.id !== nd.id)
          .attr("style", "visibility:hidden; " + transition);

        let selectedNodes = edges
          .filter((e) => e.source.id === nd.id || e.target.id === nd.id)
          .map((e) => (e.source.id === nd.id ? e.target.id : e.source.id));
        node
          .filter((n) => selectedNodes.includes(n.id))
          .attr("style", "opacity: 1");
        shadows
          .filter((n) => selectedNodes.includes(n.id))
          .attr("style", "opacity: 1");
        text
          .filter((n) => selectedNodes.includes(n.id))
          .attr("style", "visibility:visible;");
      }
    })
    .on("mouseout", releaseHover)
    .on("mousedown", releaseHover);

  const text = node
    .append("text")
    .attr("paint-order", "stroke")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("stroke-width", "2px")
    .attr("font-size", "0.75em")
    .attr("width", 10)
    .attr("y", 17)
    .attr("id", "text")
    .text((d) => d.label);

  function ticked() {
    shadows
      .attr("class", (d) => shadowClasses(d))
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
    node
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .select("circle")
      .attr("class", (d) => circleClasses(d));

    node.select("text").attr("class", (d) => textClasses(d));
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
      isDragging = true;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
      isDragging = false;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return simulation;
}
