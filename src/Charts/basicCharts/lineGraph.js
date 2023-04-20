export default function createD3LineGraph(data, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
  const { svg } = generalElements;

  // const chartWrapper = d3.select('body')
  //   .append('div')
  //   .style('position', 'absolute')
  //   .style('top', '0')
  //   .style('left', '0');

  // // Append the SVG element to the chartWrapper div
  // const container = chartWrapper
  //   .append('svg')
  //   .attr('width', options.width)
  //   .attr('height', options.height);

  const line = d3.line()// Unique to line graph?
    .x((d) => x(d.x))
    .y((d) => y(d.y));
  console.log('THIS IS LINE', line);
  svg.append('path')
    .datum(data) // TO DO LOOK INTO DATA VS DATUM
    .attr('fill', 'none')
    .attr('stroke', options.strokeColor || 'steelblue')
    .attr('stroke-width', options.strokeWidth || 1.5)
    .attr('d', line);
}
