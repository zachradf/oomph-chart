// TODO add negative and positive color change
export default function createD3WaterfallChart(data, options, chartComponents) {
  const { x } = chartComponents;
  const { y } = chartComponents;
  const { svg } = chartComponents;

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => x(d.category))
    .attr('y', (d) => y(d.start))
    .attr('height', (d) => Math.abs(y(d.end) - y(d.start)))
    .attr('width', x.bandwidth())
    .attr('fill', options.color);
}
