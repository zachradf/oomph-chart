export default function createD3ScatterPlot(data, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
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
}
