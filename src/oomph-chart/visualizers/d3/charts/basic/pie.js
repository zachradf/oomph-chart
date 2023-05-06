export default function createD3PieChart(data, options, chartComponents) {
  const { width } = options;
  const { height } = options;
  const { svg } = chartComponents;
  const radius = Math.min(width, height) / 2;

  // Centers the pie chart within the svg element
  const chartGroup = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // Create a color scale using the provided data labels and a predefined color scheme
  const color = d3.scaleOrdinal()
    .domain(data.map((d) => d.x))
    .range(d3.schemeCategory10);

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
    .attr('fill', (d) => color(d.data.y))
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
      .attr('alignment-baseline', 'central')
      .text((d) => d.data.x);
  }
}
