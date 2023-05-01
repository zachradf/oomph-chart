export default function appendAxes(chart, options, generalElements) {
  const { width } = options;
  const { height } = options;
  const { margin } = options;
  const { svg } = generalElements;
  const { xAxis } = generalElements;
  const { yAxis } = generalElements;
  // this will be checked by grpah tags in the future
  if (chart === 'POLAR' || chart === 'RADAR' || chart === 'PIE' || chart === 'DONUT' || chart === 'HEATMAP' || chart === 'BUBBLE') return;
  if (chart === 'BAR') {
    svg.append('g')
      .classed('x-axis', true)
      .call(xAxis)
      .append('text')
      .classed('x-axis-label', true)
      .attr('x', width - margin.right)
      .attr('y', margin.bottom - 10)
      .attr('text-anchor', 'end')
      .text(options.x)
      .selectAll('text')
      .style('font-size', `${options.xTickFontSize}px`);

    svg.append('g')
      .classed('y-axis', true)
      .call(yAxis)
      .append('text')
      .classed('y-axis-label', true)
      .attr('x', -margin.top)
      .attr('y', margin.left - 10)
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .text(options.y)
      .selectAll('text')
      .style('font-size', `${options.yTickFontSize}px`);
  } else if (chart === 'STACKEDBAR') {
    svg.append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', `${options.xTickFontSize}px`);

    svg.append('g')
      .classed('y-axis', true)
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .selectAll('text')
      .style('font-size', `${options.yTickFontSize}px`);
  } else if (!options.updating) {
    svg.append('g').classed('x-axis', true).call(xAxis).selectAll('text')
      .style('font-size', `${options.xTickFontSize}px`);
    svg.append('g').classed('y-axis', true).call(yAxis).selectAll('text')
      .style('font-size', `${options.yTickFontSize}px`);
  }
  if (!options.yLine) {
    svg.select('.y-axis path').remove();
  }
  if (!options.xLine) {
    svg.select('.x-axis path').remove();
  }
}
