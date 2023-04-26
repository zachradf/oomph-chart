export function createYAxisLine(g, options, xAxisPosition) {
  console.log('createYAxisLine before CONDITIONAL');
  if (!options.yLine) return;
  console.log('createYAxisLine AFTER CONDITIONAL');

  g.append('line')
    .attr('stroke', 'currentColor')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', options.margin.top - xAxisPosition)
    .attr('y2', options.height - options.margin.bottom - xAxisPosition + options.height - options.margin.top - options.margin.bottom);

  g.select('.domain').remove();
}

export function createXAxisLine(g, options) {
  if (!options.xLine) return;
  g.append('line')
    .attr('stroke', 'currentColor')
    .attr('x1', options.margin.left)
    .attr('x2', options.width - options.margin.right)
    .attr('y1', 0)
    .attr('y2', 0);

  g.select('.domain').remove();
}
