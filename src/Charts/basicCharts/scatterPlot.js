export default function createD3ScatterPlot(data, selector, options, generalElements) {
  const { width } = options;// USED IN LINE, SCATTER AND BAR
  const { height } = options;// USED IN LINE, SCATTER AND BAR
  const { x } = generalElements;
  const { y } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  const { svg } = generalElements;

  // Create circles for each data point
  svg.append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => x(d.x)) // Set the x-coordinate of the circle center
    .attr('cy', (d) => y(d.y)) // Set the y-coordinate of the circle center
    .attr('r', options.radius) // Set the circle radius
    .attr('fill', `${options.color}`);

  // Append the x-axis to the SVG
  svg.append('g')
    .classed('x-axis', true)
    .call(xAxis);

  // Append the y-axis to the SVG
  svg.append('g')
    .classed('y-axis', true)
    .call(yAxis);
}
