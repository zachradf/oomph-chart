export default function createD3AreaChart(data, options, chartComponents) {
  const { x } = chartComponents;
  const { y } = chartComponents;
  const { svg } = chartComponents;
  // Define the area generator function using the x and y scales
  const area = d3.area()
    .x((d) => x(d.x))
    .y0((d) => (d.y >= 0 ? y(0) : y(-d.y)))
    .y1((d) => y(d.y));

  const sortedData = data.sort((a, b) => a.x - b.x);

  // Create a path element for the area chart using the data and area generator
  // Fill the area with a color specified in the options or a default color
  svg.append('path')
    .datum(sortedData)
    .attr('fill', `${options.fillColor}`)
    .attr('d', area);
}
