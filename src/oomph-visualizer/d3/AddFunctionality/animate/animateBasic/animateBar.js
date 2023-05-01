export default function animateBar(selection, data, generalElements, options, duration) {
  const dynamicBarWidth = (options.width - options.margin.left - options.margin.right) / data.length - (options.width / data.length * 0.2);
  selection.transition()
    .duration(duration)
    .attr('x', (d) => generalElements.x(d.x) - dynamicBarWidth / 2)
    .attr('y', (d) => generalElements.y(d.y))
    .attr('height', (d) => generalElements.y(0) - generalElements.y(d.y))
    .attr('width', dynamicBarWidth);
}
