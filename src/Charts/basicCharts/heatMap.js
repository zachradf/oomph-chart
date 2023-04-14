export default function createD3Heatmap(data, selector, options, generalElements) {
  const {
    width, height, margin, colorScale, x = 'x', y = 'y',
  } = options;
  const { svg } = generalElements;

  // Create the x scale, using scaleBand to handle categorical data
  const xScale = d3.scaleBand()
    .domain(data.map((d) => d[x]))
    .range([margin.left, width - margin.right])
    .padding(0.25);

  // Create the y scale, using scaleBand to handle categorical data
  const yScale = d3.scaleBand()
    .domain(data.map((d) => d[y]))
    .range([margin.top, height - margin.bottom])
    .padding(0.25);

  // Create the color scale
  const color = d3.scaleSequential(colorScale)
    .domain(d3.extent(data, (d) => d.y));

  // Append a group element for the heatmap cells and bind the data
  svg.selectAll('.heatmap-cell')
    .data(data)
    .join('rect')
    .classed('heatmap-cell', true)
    .attr('x', (d) => xScale(d[x]))
    .attr('y', (d) => yScale(d[y]))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .attr('fill', (d) => color(d.y));

  // Append a group element for the x-axis and call the xAxis function
  svg.append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0))
    .append('text')
    .classed('x-axis-label', true)
    .attr('x', width - margin.right)
    .attr('y', margin.bottom - 10)
    .attr('text-anchor', 'end')
    .text(x);

  // Append a group element for the y-axis and call the yAxis function
  svg.append('g')
    .classed('y-axis', true)
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale).tickSizeOuter(0))
    .append('text')
    .classed('y-axis-label', true)
    .attr('x', -margin.top)
    .attr('y', margin.left - 10)
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-90)')
    .text(y);
}
