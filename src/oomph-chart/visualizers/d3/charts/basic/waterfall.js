// TODO add negative and positive color change
// export default function createD3WaterfallChart(data, options, chartComponents) {
//   const { x } = chartComponents;
//   const { y } = chartComponents;
//   const { svg } = chartComponents;

//   svg.append('g')
//     .selectAll('rect')
//     .data(data)
//     .join('rect')
//     .attr('x', (d) => x(d.category))
//     .attr('y', (d) => y(d.start))
//     .attr('height', (d) => Math.abs(y(d.end) - y(d.start)))
//     .attr('width', x.bandwidth())
//     .attr('fill', options.color);
// }
export default function createD3WaterfallChart(data, options, chartComponents) {
  const { x } = chartComponents;
  const { y } = chartComponents;
  const { svg } = chartComponents;
  const { color } = options;

  // Calculate 'value' for each data object
  data.forEach((item) => {
    item.value = item.y2 - item.y1;
  });

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => x(d.x)) // changed 'category' to 'x'
    .attr('y', (d) => y(d.y1)) // changed 'start' to 'y1'
    .attr('height', (d) => Math.abs(y(d.y2) - y(d.y1))) // changed 'end' to 'y2' and 'start' to 'y1'
    .attr('width', x.bandwidth())
    .attr('fill', color);
}
