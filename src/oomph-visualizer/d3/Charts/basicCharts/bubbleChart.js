export default function createBubbleChart(data, options, generalElements) {
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
    .padding(options.padding); // Increase padding to prevent overlap

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
    .style('fill', (d) => d3.schemeCategory10[d.depth])
    .style('opacity', (d) => (d.depth <= 1 ? 1 : options.opacity))

  // Add labels to the bubbles
  nodes
    .append('text')
    .attr('dy', '.3em')
    .style('text-anchor', `${options.textAnchor}`)
    .style('font-size', (d) => (d.depth === 1 ? `${options.parentTextSize}` : `${options.childTextSize}`))
    .style('fill', `${options.fontColor}`) // Set the text color explicitly
    .text((d) => {
      if (d.depth === 1) {
        // Add category label for parent categories (category1 and category2)
        return d.data.name;
      } if (d.depth === 2) {
        // Add label for subcategories
        return d.data.name;
      }
      return null;
    })
    .attr('x', 0) // Center the text horizontally
    .attr('y', (d) => (d.depth === 1 ? -options.height / 6 : 0)); // Adjust the text placement
}
