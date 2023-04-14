// TODO add negative and positive color change
export default function createD3WaterfallChart(data, selector, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  const { svg } = generalElements;

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => x(d.category))
    .attr('y', (d) => y(d.start))
    .attr('height', (d) => Math.abs(y(d.end) - y(d.start)))
    .attr('width', x.bandwidth())
    .attr('fill', options.color);

  svg.append('g')
    .classed('x-axis', true)
    .call(xAxis);

  svg.append('g')
    .classed('y-axis', true)
    .call(yAxis);
}
