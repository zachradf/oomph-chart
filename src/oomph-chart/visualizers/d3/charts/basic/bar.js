// export default function createD3BarChart(data, options, chartComponents) {
//   const { x } = chartComponents;
//   const { y } = chartComponents;
//   const { svg } = chartComponents;

//   // Sort the data by the x value
//   data.sort((a, b) => d3.ascending(a.x, b.x));

//   // Determine if the x scale is linear or band
//   const isLinearScale = x.domain()[1] !== undefined && typeof x.domain()[1] === 'number';
//   // Calculate the bar width depending on the x scale type
//   const barWidth = isLinearScale ? (options.width / data.length) + options.barWidth : x.bandwidth();
//   // console.log('barWidth:', barWidth, isLinearScale,);
//   // Append a group element for the bars, set the fill color, and bind the data
//   svg.append('g')
//     .selectAll('rect')
//     .data(data)
//     .join('rect')
//     // .attr('x', (d) => (isLinearScale ? x(d.x) - barWidth / 2 : x(d.x)))
//     .attr('x', (d) => (isLinearScale ? x(d.x) - barWidth / 2 : x(d.x)))
//     .attr('y', (d) => (d.y >= 0 ? y(d.y) : y(0)))
//     .attr('height', (d) => (d.y >= 0 ? y(0) - y(d.y) : y(d.y) - y(0)))
//     .attr('fill', options.fillColor)
//     .attr('width', barWidth);
// }
export default function createD3BarChart(data, options, chartComponents) {
  const { x, y, svg } = chartComponents;
  const { width, barWidth, fillColor } = options; // Destructuring the required properties from options

  // Sort the data by the x value
  data.sort((a, b) => d3.ascending(a.x, b.x));

  // Determine if the x scale is linear or band
  const isLinearScale = typeof data[0].x === 'number';
  // Calculate the bar width depending on the x scale type
  const computedBarWidth = isLinearScale ? (width / data.length) - barWidth : x.bandwidth();

  // Append a group element for the bars, set the fill color, and bind the data
  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => (isLinearScale ? x(d.x) - computedBarWidth / 2 : x(d.x)))
    .attr('y', (d) => y(Math.max(0, d.y)))
    .attr('height', (d) => Math.abs(y(d.y) - y(0)))
    .attr('fill', fillColor) // Using fillColor directly instead of options.fillColor
    .attr('width', computedBarWidth); // Using computedBarWidth instead of directly calculating it
}
