export default function createD3LineGraph(data, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
  const { svg } = generalElements;

  const line = d3.line()// Unique to line graph?
    .x((d) => x(d.x))
    .y((d) => y(d.y));

  svg.append('path')
    .datum(data) // TO DO LOOK INTO DATA VS DATUM
    .attr('fill', 'none')
    .attr('stroke', options.strokeColor || 'steelblue')
    .attr('stroke-width', options.strokeWidth || 1.5)
    .attr('d', line);
}
