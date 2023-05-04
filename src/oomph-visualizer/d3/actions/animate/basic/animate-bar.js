export default function animateBar(selection, data, chartComponents, options, duration) {
  const { width, margin, barWidth } = options;
  const dynamicBarWidth = ((width - margin.left - margin.right) / data.length) + barWidth;
  selection.transition()
    .duration(duration)
    .attr('x', (d) => chartComponents.x(d.x) - dynamicBarWidth / 2)
    .attr('y', (d) => chartComponents.y(d.y))
    .attr('height', (d) => chartComponents.y(0) - chartComponents.y(d.y))
    .attr('width', dynamicBarWidth);
}
