export default function appendAxes(chart, options, chartComponents) {
  const { width } = options;
  const { height } = options;
  const { margin } = options;
  const { svg } = chartComponents;
  const { xAxis } = chartComponents;
  const { yAxis } = chartComponents;
  // this will be checked by graph tags in the future
  if (chart === 'polar' || chart === 'radar' || chart === 'pie' || chart === 'donut' || chart === 'heatmap' || chart === 'bubble') return;
  if (!options.isUpdating) {
    // X-axis
    const xAxisG = svg.append('g')
      .classed('x-axis', true)
      .attr('transform', chart === 'stackedbar' ? `translate(0,${height - margin.bottom})` : '')
      .call(xAxis);

    // Style X-axis ticks
    xAxisG.selectAll('text')
      .style('font-size', `${options.xTickFontSize}px`)
      .style('fill', `${options.xFontColor}`)
      .style('font-family', `${options.xFontFamily}`)
      .style('font-weight', `${options.xFontWeight}`)
      .style('opacity', `${options.xFontOpacity}`);

    // Create and style X-axis label
    xAxisG.append('text')
      .classed('x-axis-label', true)
      .attr('x', width - margin.right + options.xLabelOffsetX) // Add x offset
      .attr('y', margin.bottom - 10 + options.xLabelOffsetY) // Add y offset
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(${options.xLabelRotation}, ${width - margin.right + options.xLabelOffsetX}, ${margin.bottom - 10 + options.xLabelOffsetY})`) // Add rotation
      .text(options.xLabel)
      .style('font-size', `${options.xLabelFontSize}px`)
      .style('fill', `${options.xLabelFontColor}`)
      .style('font-family', `${options.xLabelFontFamily}`)
      .style('font-weight', `${options.xLabelFontWeight}`)
      .style('opacity', `${options.xLabelFontOpacity}`);

    // Y-axis
    const yAxisG = svg.append('g')
      .classed('y-axis', true)
      .attr('transform', chart === 'stackedbar' ? `translate(${margin.left},0)` : '')
      .call(yAxis);

    // Style Y-axis ticks
    yAxisG.selectAll('text')
      .style('font-size', `${options.yTickFontSize}px`)
      .style('fill', `${options.yFontColor}`)
      .style('font-family', `${options.yFontFamily}`)
      .style('font-weight', `${options.yFontWeight}`)
      .style('opacity', `${options.yFontOpacity}`);

    // Create and style Y-axis label
    yAxisG.append('text')
      .classed('y-axis-label', true)
      .attr('x', -margin.top + options.yLabelOffsetX) // Add x offset
      .attr('y', margin.left - 10 + options.yLabelOffsetY) // Add y offset
      .attr('text-anchor', 'end')
      .attr('transform', `rotate(${options.yLabelRotation}, ${-margin.top + options.yLabelOffsetX}, ${margin.left - 10 + options.yLabelOffsetY})`) // Add rotation
      .text(options.yLabel)
      .style('font-size', `${options.yLabelFontSize}px`)
      .style('fill', `${options.yLabelFontColor}`)
      .style('font-family', `${options.yLabelFontFamily}`)
      .style('font-weight', `${options.yLabelFontWeight}`)
      .style('opacity', `${options.yLabelFontOpacity}`);
  }
  if (!options.yLine) {
    svg.select('.y-axis path').remove();
  }
  if (!options.xLine) {
    svg.select('.x-axis path').remove();
  }
}
