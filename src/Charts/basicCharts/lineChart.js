export default function createD3LineGraph(data, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
  const { svg } = generalElements;

  // Sort the data by the x value if its numerical
  if (typeof data[0].x === 'number') {
    data.sort((a, b) => d3.ascending(a.x, b.x));
  }
  const line = d3.line()
    .x((d) => x(d.x))
    .y((d) => y(d.y));

  const sortedData = data.sort((a, b) => a.x - b.x);

  svg.append('path')
    .datum(sortedData) // TO DO LOOK INTO DATA VS DATUM
    .attr('fill', 'none')
    .attr('stroke', options.strokeColor || 'steelblue')
    .attr('stroke-width', options.strokeWidth || 1.5)
    .attr('d', line);
}
