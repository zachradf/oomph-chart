export default function animateScatter(chartElements, data, generalElements, duration) {
  const updateSelection = chartElements.data(data);
  const enterSelection = updateSelection.enter();
  const exitSelection = updateSelection.exit();

  // Enter selection
  enterSelection
    .append('circle')
    .attr('class', 'scatter-plot0')
    .attr('r', 5); // Set radius for new circle elements

  // Update selection
  updateSelection
    .merge(enterSelection)
    .transition()
    .duration(duration)
    .attr('cx', (d) => generalElements.x(d.x))
    .attr('cy', (d) => generalElements.y(d.y));

  // Exit selection
  exitSelection.remove();
}
