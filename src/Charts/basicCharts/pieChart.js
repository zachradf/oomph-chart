export default function createD3PieChart(data, selector, options, generalElements) {
  // console.log('createD3PieChart', data, selector);
  const { width } = options;
  const { height } = options;
  const { svg } = generalElements;
  const radius = Math.min(width, height) / 2;

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
  svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('fill', (d) => color(d.data.y))
    .attr('d', arc)
    .attr('stroke', 'white')
    .attr('stroke-width', '2px');

  // If the showCategories option is set, add categories to the pie chart
  if (options.showCategories) {
    // Define a label arc generator with a fixed radius value
    const categoryArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // Create text elements for the labels by binding the data
    svg.selectAll('text')
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => `translate(${categoryArc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .text((d) => d.data.x);
  }
}
