export function createYAxisLine(g, options, xAxisPosition) {
  if (!options.yLine || options.isUpdating) return;

  g.append('line')
    .attr('stroke', options.yAxisColor)
    .attr('stroke-opacity', options.yAxisOpacity)
    .attr('stroke-width', `${options.yAxisWidth}`)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', options.margin.top - xAxisPosition)
    .attr('y2', options.height - options.margin.bottom - xAxisPosition + options.height - options.margin.top - options.margin.bottom);

  g.select('.domain').remove();
}

export function createXAxisLine(g, options) {
  if (!options.xLine || options.isUpdating) return;
  g.append('line')
    .attr('stroke', options.xAxisColor)
    .attr('stroke-opacity', options.xAxisOpacity)
    .attr('stroke-width', `${options.xAxisWidth}`)
    .attr('x1', options.margin.left)
    .attr('x2', options.width - options.margin.right)
    .attr('y1', 0)
    .attr('y2', 0);

  g.select('.domain').remove();
}
