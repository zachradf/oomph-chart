export default function animateLine(chartElements, data, generalElements, duration) {
  const line = d3.line()
    .x((d) => generalElements.x(d.x))
    .y((d) => generalElements.y(d.y));

  // const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));

  const updateSelection = chartElements.data(data);
  const exitSelection = updateSelection.exit();

  // Select the existing path element using the class 'line-graph0'
  const linePath = chartElements.filter('.line-graph0');

  // Update the 'd' attribute of the existing path element
  linePath
    .data([data])
    .transition()
    .duration(duration)
    .attr('d', line);

  exitSelection.remove();
}
