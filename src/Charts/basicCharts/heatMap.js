export default function createD3Heatmap(data, selector, options) {
  const {
    width, height, margin, colorScale, xLabel, yLabel,
  } = options;

  // Create the x scale, using scaleBand to handle categorical data
  const x = d3.scaleBand()
    .domain(data.map((d) => d.xLabel))
    .range([margin.left, width - margin.right])
    .padding(0.25);

  // Create the y scale, using scaleBand to handle categorical data
  const y = d3.scaleBand()
    .domain(data.map((d) => d.yLabel))
    .range([margin.top, height - margin.bottom])
    .padding(0.25);

  // Create the color scale
  const color = d3.scaleSequential(colorScale)
    .domain(d3.extent(data, (d) => d.value));

  // Select the element with the given selector and create an SVG container
  const svg = d3.select(selector)
    .append('svg')
    .classed('heat-map', true)
    .attr('width', width)
    .attr('height', height);

  // Append a group element for the heatmap cells and bind the data
  svg.selectAll('.heatmap-cell')
    .data(data)
    .join('rect')
    .classed('heatmap-cell', true)
    .attr('x', (d) => x(d.xLabel))
    .attr('y', (d) => y(d.yLabel))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', (d) => color(d.value));

  // Append a group element for the x-axis and call the xAxis function
  svg.append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .append('text')
    .classed('x-axis-label', true)
    .attr('x', width - margin.right)
    .attr('y', margin.bottom - 10)
    .attr('text-anchor', 'end')
    .text(xLabel);

  // Append a group element for the y-axis and call the yAxis function
  svg.append('g')
    .classed('y-axis', true)
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .append('text')
    .classed('y-axis-label', true)
    .attr('x', -margin.top)
    .attr('y', margin.left - 10)
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-90)')
    .text(yLabel);
}
