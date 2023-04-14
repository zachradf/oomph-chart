export default function createD3FunnelChart(data, selector, options, generalElements) {
  const {
    width, colors,
  } = options;
  const { x } = generalElements;
  const { y } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  const { svg } = generalElements;

  const colorScale = d3.scaleOrdinal().domain(data.map((d) => d.x)).range(colors);

  const funnel = svg
    .selectAll('g')
    .data(data)
    .join('g')
    .attr('transform', (d, i) => `translate(0, ${y(d.x)})`);

  funnel
    .append('rect')
    .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
    .attr('width', (d) => x(d.y) - x(0))
    .attr('height', y.bandwidth())
    .attr('fill', (d) => colorScale(d.x));

  svg.append('g').classed('y-axis', true).call(yAxis);
  svg.append('g').classed('x-axis', true).call(xAxis);
}
