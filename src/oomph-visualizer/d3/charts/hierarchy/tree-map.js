export default function createD3TreeMap(data, options, generalElements) {
  // Set default options
  const width = options.width || 600;
  const height = options.height || 400;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const { svg } = generalElements;

  // Create the treemap layout
  const treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

  // Process the data
  const root = d3.hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  treemap(root);

  // Draw the treemap
  const leaf = svg.selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  leaf.append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', (d) => color(d.parent.data.name));

  leaf.append('text')
    .attr('x', 3)
    .attr('y', 12)
    .text((d) => d.data.name)
    .style('font-size', `${options.childTextSize}`);
}
