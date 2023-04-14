export default function createBubbleChart(data, selector, options, generalElements) {
  const { diameter } = options;
  const { svg } = generalElements;

  // Prepare the data for the chart
  const root = d3
    .hierarchy({ children: data })
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  // Create the bubble layout
  const bubbleLayout = d3
    .pack()
    .size([diameter, diameter])
    .padding(1.5);

  // Apply the layout to the data
  bubbleLayout(root);

  // Create the bubbles
  const nodes = svg
    .selectAll('g')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  // Add circles to the bubbles
  nodes
    .append('circle')
    .attr('r', (d) => d.r)
    .style('fill', (d) => d3.schemeCategory10[d.depth]);

  // Add labels to the bubbles
  nodes
    .append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .text((d) => d.data.name);

  // Prevent overlapping bubbles
  nodes.each(function(d) {
    const node = d3.select(this);
    const siblings = node
      .datum()
      .parent
      .children
      .filter((s) => s !== d && s.r);
    const padding = 2;

    if (siblings.length) {
      const distance = d.r + d3.max(siblings, (s) => s.r + padding);

      if (distance < d.parent.r) {
        d.y -= distance;
        node.attr('transform', (d) => `translate(${d.x},${d.y})`);
      }
    }
  });
}
