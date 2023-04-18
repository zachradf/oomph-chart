export default function appendAxes(graph, options, generalElements) {
  const { width } = options;
  const { height } = options;
  const { margin } = options;
  const { svg } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  // this will be checked by grpah tags in the future
  if (graph === 'POLAR' || graph === 'RADAR' || graph === 'PIE' || graph === 'DONUT' || graph === 'HEATMAP' || graph === 'BUBBLE') return;
  if (graph === 'BAR') {
    svg.append('g')
      .classed('x-axis', true)
      .call(xAxis)
      .append('text')
      .classed('x-axis-label', true)
      .attr('x', width - margin.right)
      .attr('y', margin.bottom - 10)
      .attr('text-anchor', 'end')
      .text(options.x);

    svg.append('g')
      .classed('y-axis', true)
      .call(yAxis)
      .append('text')
      .classed('y-axis-label', true)
      .attr('x', -margin.top)
      .attr('y', margin.left - 10)
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .text(options.y);
  } else if (graph === 'STACKEDBAR') {
    svg.append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .classed('y-axis', true)
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);
  } else {
    svg.append('g').classed('y-axis', true).call(yAxis);
    svg.append('g').classed('x-axis', true).call(xAxis);
  }
}