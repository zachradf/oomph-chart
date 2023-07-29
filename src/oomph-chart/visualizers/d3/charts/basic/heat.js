export default function createD3Heatmap(data, options, chartComponents) {
  const {
    colorScheme,
  } = options;
  const { svg, y, x } = chartComponents;

  // Create the color scale
  const color = d3.scaleSequential(colorScheme)
    .domain(d3.extent(data, (d) => d.y2)); // Changed from d.y to d.y2

  // Append a group element for the heatmap cells and bind the data
  svg.selectAll('.heatmap-cell')
    .data(data)
    .join('rect')
    .classed('heatmap-cell', true)
    .attr('x', (d) => x(d.x))
    .attr('y', (d) => y(d.y1)) // Changed from d[y] to d[y1]
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('fill', (d) => color(d.y2)); // Changed from d.y to d.y2
}
