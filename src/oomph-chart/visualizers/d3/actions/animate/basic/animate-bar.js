export default function animateBar(selection, data, chartComponents, options, duration) {
  const { width, barWidth } = options;
  const { x, y } = chartComponents;
  const isLinearScale = x.domain()[1] !== undefined && typeof x.domain()[1] === 'number';
  const dynamicBarWidth = isLinearScale ? (options.width / data.length) + options.barWidth : x.bandwidth() + options.barWidth;

  // const dynamicBarWidth = (width / data.length) + barWidth;
  // console.log('width', width, 'data.length', data.length, 'barwidth', barWidth, dynamicBarWidth);

  selection.transition()
    .duration(duration)
    .attr('fill', options.fillColor)
    .attr('width', dynamicBarWidth)
    .attr('x', (d) => (isLinearScale ? x(d.x) - barWidth / 2 : x(d.x)))
    .attr('y', (d) => (d.y >= 0 ? y(d.y) : y(0)))
    .attr('height', (d) => (d.y >= 0 ? y(0) - y(d.y) : y(d.y) - y(0)))
    .attr('x', (d) => (isLinearScale ? x(d.x) - barWidth / 2 : x(d.x)))
    .attr('y', (d) => y(Math.max(0, d.y)))
    .attr('height', (d) => Math.abs(y(d.y) - y(0)));
}
// export default function animateBar(selection, data, chartComponents, options, duration) {
//   const { width, barWidth } = options;
//   const { x, y } = chartComponents;
//   const isLinearScale = x.domain()[1] !== undefined && typeof x.domain()[1] === 'number';
//   const dynamicBarWidth = isLinearScale ? (options.width / data.length) + options.barWidth : x.bandwidth() + options.barWidth;

//   // Find the element with the maximum y value
//   const maxData = data.reduce((max, d) => (d.y > max.y ? d : max), { y: -Infinity });
//   const trackedElementCoords = {};
//   selection.transition()
//     .duration(duration)
//     .attr('x', (d) => {
//       const xPos = isLinearScale ? x(d.x) - barWidth / 2 : x(d.x);

//       // Save the x coordinate if the element's data matches maxData
//       if (d === maxData) {
//         trackedElementCoords.x = xPos;
//       }
//       return xPos;
//     })
//     .attr('y', (d) => {
//       const yPos = d.y >= 0 ? y(d.y) : y(0);

//       // Save the y coordinate if the element's data matches maxData
//       if (d === maxData) {
//         trackedElementCoords.y = yPos;
//       }
//       return yPos;
//     })
//     .attr('height', (d) => (d.y >= 0 ? y(0) - y(d.y) : y(d.y) - y(0)))
//     .attr('width', dynamicBarWidth);
//   console.log(trackedElementCoords);
//   return trackedElementCoords;
// }
