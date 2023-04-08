export default function createD3PieChart(data, selector, options) {
  const { width } = options;
  const { height } = options;
  const radius = Math.min(width, height) / 2;

  // Create a color scale using the provided data labels and a predefined color scheme
  const color = d3.scaleOrdinal()
    .domain(data.map((d) => d.label))
    .range(d3.schemeCategory10);

  // Define the pie layout function with value accessor and sort function
  const pie = d3.pie()
    .value((d) => d.value)
    .sort(null);

  // Define the arc generator function with inner and outer radius values
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Select the target HTML element, append an SVG, and create a group element (g)
  // Position the group element at the center of the SVG
  const svg = d3.select(selector)
    .append('svg')
    .classed('pie-chart', true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // Create the pie chart sectors by binding the data to path elements
  // Fill the sectors with colors based on the data labels
  // Use the arc generator to draw the pie sectors
  // Add a white stroke to separate the sectors
  svg.selectAll('path')
    .data(pie(data))
    .join('path')
    .attr('fill', (d) => color(d.data.label))
    .attr('d', arc)
    .attr('stroke', 'white')
    .attr('stroke-width', '2px');

  // If the showLabels option is set, add labels to the pie chart
  if (options.showLabels) {
    // Define a label arc generator with a fixed radius value
    const labelArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // Create text elements for the labels by binding the data
    // Position the labels at the centroid of each sector
    // Set text-anchor and alignment-baseline attributes for proper label positioning
    // Use the data label as the text content
    svg.selectAll('text')
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .text((d) => d.data.label);
  }
}
