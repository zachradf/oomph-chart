export default function animateBar(selection, data, generalElements, options, duration) {
  const { width, margin, barWidth } = options;
  const dynamicBarWidth = ((width - margin.left - margin.right) / data.length) + barWidth;
  selection.transition()
    .duration(duration)
    .attr('x', (d) => generalElements.x(d.x) - dynamicBarWidth / 2)
    .attr('y', (d) => generalElements.y(d.y))
    .attr('height', (d) => generalElements.y(0) - generalElements.y(d.y))
    .attr('width', dynamicBarWidth);
}
