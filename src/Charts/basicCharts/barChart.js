export default function createD3BarChart(data, selector, options, generalElements) {
  const { width } = options;
  const { margin } = options;
  const { x } = generalElements;
  const { y } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  const { svg } = generalElements;

  // Append a group element for the bars, set the fill color and bind the data
  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => x(d.x))
    .attr('y', (d) => y(d.y))
    .attr('height', (d) => y(0) - y(d.y))
    .attr('fill', options.color)
    .attr('width', x.bandwidth());

  // Append a group element for the x-axis and call the xAxis function
  svg.append('g')
    .classed('x-axis', true)
    .call(xAxis)
    .append('text')
    .classed('x-axis-label', true)
    .attr('x', width - margin.right)
    .attr('y', margin.bottom - 10)
    .attr('text-anchor', 'end')
    .text(options.x);

  // Append the y-axis to the SVG
  svg.append('g')
    .classed('y-axis', true)
    .call(yAxis)
    .append('text')
    .classed('y-axis-label', true)
    .attr('x', -margin.top)
    .attr('y', margin.left - 10)
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-90)')
    .text(options.y);
}
