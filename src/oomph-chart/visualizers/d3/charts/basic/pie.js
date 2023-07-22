export default function createD3PieChart(data, options, chartComponents) {
  const { width } = options;
  const { height } = options;
  const { svg } = chartComponents;
  const { radius } = options;

  // Centers the pie chart within the svg element
  const chartGroup = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // Create a color scale using the provided data labels and a predefined color scheme
  const colorScale = d3.scaleOrdinal()
    .domain(d3.range(options.colorScheme.length))
    .range(options.colorScheme);

  // Define the pie layout function with value accessor and sort function
  const pie = d3.pie()
    .value((d) => d.y)
    .sort(null);

  // Define the arc generator function with inner and outer radius values
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Create the pie chart sectors by binding the data to path elements
  chartGroup.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('fill', (d) => colorScale(d.data.y))
    .attr('d', arc)
    .attr('stroke', `${options.strokeColor}` || 'white')
    .attr('stroke-width', `${options.strokeWidth}px` || '2px');

  // If the showCategories option is set, add categories to the pie chart
  if (options.showCategories) {
    // Define a label arc generator with a fixed radius value
    const categoryArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // Create text elements for the labels by binding the data
    chartGroup.selectAll('text')
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => `translate(${categoryArc.centroid(d)})`)
      .attr('text-anchor', `${options.textAnchor}`)
      .style('font-size', `${options.xLabelFontSize}px`)
      .style('fill', `${options.fontColor}`)
      .style('font-family', `${options.fontFamily}`)
      .style('font-weight', `${options.fontWeight}`)
      .style('opacity', `${options.fontOpacity}`)
      .attr('alignment-baseline', 'central')
      .text((d) => d.data.x);
  }
}
