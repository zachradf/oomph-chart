export default function createD3AreaChart(data, options, generalElements) {
  const { height } = options;
  const { margin } = options;
  const { x } = generalElements;
  const { y } = generalElements;
  const { svg } = generalElements;
  // Define the area generator function using the x and y scales
  const area = d3.area()
    .x((d) => x(d.x))
    .y0(height - margin.bottom)
    .y1((d) => y(d.y));
    
    const sortedData = data.sort((a, b) => a.x - b.x);

  // Create a path element for the area chart using the data and area generator
  // Fill the area with a color specified in the options or a default color
  svg.append('path')
    .datum(sortedData)
    .attr('fill', `${options.fillColor}`)
    .attr('d', area);
}
