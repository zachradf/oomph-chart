// export default function updateD3FunnelChart(chartComponents, data, duration, options) {
//   const { width } = options;
//   const { colors } = options;
//   const { x } = chartComponents;
//   const { y } = chartComponents;
//   const colorScale = d3.scaleOrdinal().domain(data.map((d) => d.x)).range(colors);
//   const svg = d3.select('svg');

//   // Update funnel groups
//   const funnelUpdate = svg.selectAll('g.funnel-chart0')
//     .data(data);

//   // Update the groups
//   funnelUpdate.join(
//     (enter) => enter.append('g')
//       .attr('class', 'funnel-chart0')
//       .attr('transform', (d, i) => `translate(0, ${y(d.x)})`),
//     (update) => update.transition()
//       .duration(duration)
//       .attr('transform', (d, i) => `translate(0, ${y(d.x)})`),
//     (exit) => exit.remove(),
//   );

//   // Update rects within the funnel groups
//   const rectsUpdate = svg.selectAll('g.funnel-chart0')
//     .selectAll('rect')
//     .data((d) => [d]);

//   rectsUpdate.join(
//     (enter) => enter.append('rect')
//       .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
//       .attr('width', (d) => x(d.y) - x(0))
//       .attr('height', y.bandwidth())
//       .attr('fill', (d) => colorScale(d.x)),
//     (update) => update.transition()
//       .duration(duration)
//       .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
//       .attr('width', (d) => x(d.y) - x(0))
//       .attr('height', y.bandwidth())
//       .attr('fill', (d) => colorScale(d.x)),
//     (exit) => exit.remove(),
//   );
// }
// export default function updateD3FunnelChart(chartComponents, data, duration, options) {
//     const { width } = options;
//     const { colors } = options;
//     const { x } = chartComponents;
//     const { y } = chartComponents;
//     const colorScale = d3.scaleOrdinal().domain(data.map((d) => d.x)).range(colors);
//     const svg = d3.select('svg');

//     // Update the y scale domain
//     y.domain(data.map((d) => d.x));

//     // Update funnel groups
//     const funnelUpdate = svg.selectAll('g.funnel-chart0')
//       .data(data);

//     // Update the groups
//     const funnelEnter = funnelUpdate.enter()
//       .append('g')
//         .attr('class', 'funnel-chart0');

//     funnelUpdate.exit().remove();

//     const funnelMerge = funnelEnter.merge(funnelUpdate)
//       .transition()
//       .duration(duration)
//       .attr('transform', (d, i) => `translate(0, ${y(d.x)})`);

//     // Update rects within the funnel groups
//     funnelMerge.each(function(d) {
//       const rectsUpdate = d3.select(this).selectAll('rect')
//         .data([d], (d) => d.x);

//       rectsUpdate.enter()
//         .append('rect')
//           .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
//           .attr('width', (d) => x(d.y) - x(0))
//           .attr('height', y.bandwidth())
//           .attr('fill', (d) => colorScale(d.x));

//       rectsUpdate.transition()
//         .duration(duration)
//         .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
//         .attr('width', (d) => x(d.y) - x(0))
//         .attr('height', y.bandwidth())
//         .attr('fill', (d) => colorScale(d.x));

//       rectsUpdate.exit().remove();
//     });
//   }
// UNDER CONSTRUCTION
export default function updateD3FunnelChart(chartComponents, data, duration, options) {
  const { width } = options;
  const { colors } = options;
  const { x } = chartComponents;
  const { y } = chartComponents;
  const colorScale = d3.scaleOrdinal().domain(data.map((d) => d.x)).range(colors);
  const svg = d3.select('svg');

  // Update rects directly
  const rectsUpdate = svg.selectAll('rect.funnel-chart0')
    .data(data, (d) => d.x);
  const rectHeight = options.height / data.length;

  rectsUpdate.join(
    (enter) => enter.append('rect')
      .attr('class', 'funnel-chart0')
      .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
      .attr('width', (d) => x(d.y) - x(0))
      .attr('height', rectHeight)
      .attr('fill', (d) => colorScale(d.x))
      .attr('transform', (d, i) => `translate(0, ${y(d.x)})`),
    (update) => update.transition()
      .duration(duration)
      .attr('x', (d) => (width - x(d.y) + x(0)) / 2)
      .attr('width', (d) => x(d.y) - x(0))
      .attr('height', y.bandwidth())
      .attr('fill', (d) => colorScale(d.x)),
    // .attr('transform', (d, i) => `translate(0, ${y(d.x)})`),
    (exit) => exit.remove()
  );
}
