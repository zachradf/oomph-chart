export default function createD3BarChart(data, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
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
}
