export default function createForceDirectedGraph(data, selector, options = {}) {
  // Set default options or use provided options
  const width = options.width || 600;
  const height = options.height || 600;
  const color = options.color || d3.scaleOrdinal(d3.schemeCategory10);
  const linkDistance = options.linkDistance || 50;
  const chargeStrength = options.chargeStrength || -200;

  // Create an SVG element and set its dimensions
  const svg = d3.select(selector)
    .append('svg')
    .classed('force-directed', true)
    .attr('width', width)
    .attr('height', height);
  // TODO create a generalized SVG function that can be used for all charts

  // Create a force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force(
      'link',
      d3.forceLink(data.links).id((d) => d.id).distance(linkDistance)
    )
    .force('charge', d3.forceManyBody().strength(chargeStrength))
    .force('center', d3.forceCenter(width / 2, height / 2));

  // Draw links
  const link = svg.selectAll('.link')
    .data(data.links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', (d) => Math.sqrt(d.value));

  // Draw nodes
  const node = svg.selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', 5)
    .attr('fill', (d) => color(d.group))
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));
  // TODO create a node and generalized drag function that can be used for all charts

  // Add labels
  const label = svg.selectAll('.label')
    .data(data.nodes)
    .enter()
    .append('text')
    .attr('class', 'label')
    .text((d) => d.id)
    .attr('text-anchor', `${options.textAnchor}`)
    .attr('font-size', `${options.childTextSize}`);

  // Define what happens when dragging starts, continues, and ends
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // Update the positions of nodes and links while the simulation is running
  simulation.on('tick', () => {
    link.attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    node.attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);

    label.attr('x', (d) => d.x)
      .attr('y', (d) => d.y - 10);
  });
}
