export default function animateScatter(chartElements, data, chartComponents, duration) {
  const updateSelection = chartElements.data(data);
  const enterSelection = updateSelection.enter();
  const exitSelection = updateSelection.exit();

  // Enter selection
  enterSelection
    .append('circle')
    .attr('class', 'scatter0')
    .attr('r', 5); // Set radius for new circle elements

  // Update selection
  updateSelection
    .merge(enterSelection)
    .transition()
    .duration(duration)
    .attr('cx', (d) => chartComponents.x(d.x))
    .attr('cy', (d) => chartComponents.y(d.y));

  // Exit selection
  exitSelection.remove();
}
