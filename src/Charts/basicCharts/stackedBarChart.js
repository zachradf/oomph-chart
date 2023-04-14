export default function createD3StackedBarChart(data, selector, options, generalElements) {
  const { height, margin } = options;
  const {
    x, y, xAxis, yAxis, svg,
  } = generalElements;

  // Create a color scale using the color scheme provided
  const color = d3.scaleOrdinal()
    .domain(data[0].values.map((v) => v.group))
    .range(options.color);

  // Create a stack generator to transform the data into stacked form
  const stack = d3.stack()
    .keys(data[0].values.map((v) => v.group))
    .value((d, key) => (d.find((v) => v.group === key)).value);

  // Append a group element for the bars
  const bars = svg.append('g')
    .selectAll('g')
    .data(stack(data.map((d) => d.values)))
    .join('g')
    .attr('fill', (d) => color(d.key));

  // Append a rectangle for each data point in the stack
  bars.selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d, i) => x(data[i].category))
    .attr('y', (d) => y(d[1]))
    .attr('height', (d) => y(d[0]) - y(d[1]))
    .attr('width', x.bandwidth());

  // Append a group element for the x-axis and call the xAxis function
  svg.append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  // Append the y-axis to the SVG
  svg.append('g')
    .classed('y-axis', true)
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);
}
