export default function createD3LineGraph(data, selector, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  const { svg } = generalElements;

  const line = d3.line()// Unique to line graph?
    .x((d) => x(d.x))
    .y((d) => y(d.y));

  svg.append('path')
    .datum(data) // TO DO LOOK INTO DATA VS DATUM
    .attr('fill', 'none')
    .attr('stroke', options.strokeColor || 'steelblue')
    .attr('stroke-width', options.strokeWidth || 1.5)
    .attr('d', line);

  svg.append('g')// USED IN LINE, SCATTER AND BAR
    .classed('x-axis', true)
    .call(xAxis);// USED IN LINE, SCATTER AND BAR

  // Append the y-axis to the SVG
  svg.append('g')// USED IN LINE, SCATTER AND BAR
    .classed('y-axis', true)
    .call(yAxis);// USED IN LINE, SCATTER AND BAR
}
