export default function animateBar(selection, data, chartComponents, options, duration) {
  const { width, barWidth } = options;
  const { x, y } = chartComponents;
  const isLinearScale = x.domain()[1] !== undefined && typeof x.domain()[1] === 'number';
  const dynamicBarWidth = isLinearScale ? (options.width / data.length) + options.barWidth : x.bandwidth() + options.barWidth;

  // const dynamicBarWidth = (width / data.length) + barWidth;
  // console.log('width', width, 'data.length', data.length, 'barwidth', barWidth, dynamicBarWidth);

  selection.transition()
    .duration(duration)
    .attr('x', (d) => (isLinearScale ? x(d.x) - barWidth / 2 : x(d.x)))
    .attr('y', (d) => (d.y >= 0 ? y(d.y) : y(0)))
    .attr('height', (d) => (d.y >= 0 ? y(0) - y(d.y) : y(d.y) - y(0)))
    .attr('width', dynamicBarWidth);
}
