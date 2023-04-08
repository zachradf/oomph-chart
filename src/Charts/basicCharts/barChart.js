export default function createD3BarChart(data, selector, options) {
  const { width } = options;
  const { height } = options;
  const { margin } = options;
  // Create the x scale, using scaleBand to handle categorical data
  const x = d3.scaleBand()
    .domain(data.map((d) => d.label)) // Extract labels from the data
    .range([margin.left, width - margin.right]) // Set the range using the margins
    .padding(0.1); // Add padding between the bars

  // Create the y scale, using scaleLinear for numerical data
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)]).nice() // Set the domain using the data's max value
    .range([height - margin.bottom, margin.top]); // Set the range using the margins

  // Define the x-axis using the x scale
  const xAxis = (g) => g
    .attr('transform', `translate(0,${height - margin.bottom})`) // Position the x-axis
    .call(d3.axisBottom(x).tickSizeOuter(0)); // Create the axis with no outer tick size

  // Define the y-axis using the y scale
  const yAxis = (g) => g
    .attr('transform', `translate(${margin.left},0)`) // Position the y-axis
    .call(d3.axisLeft(y)) // Create the axis
    .call((g) => g.select('.domain').remove()); // Remove the y-axis line

  // Select the element with the given selector and create an SVG container
  const svg = d3.select(selector)
    .append('svg')
    .classed('bar-chart', true)
    .attr('width', width)
    .attr('height', height);

  // Append a group element for the bars, set the fill color and bind the data
  svg.append('g')
    .attr('fill', `${options.color}`)
    .selectAll('rect')
    .data(data)
    .join('rect') // Create a rectangle for each data point
    .attr('x', (d) => x(d.label)) // Set the x position using the x scale
    .attr('y', (d) => y(d.value)) // Set the y position using the y scale
    .attr('height', (d) => y(0) - y(d.value)) // Set the height based on the y scale
    .attr('width', x.bandwidth()); // Set the width based on the x scale's bandwidth

  // Append a group element for the x-axis and call the xAxis function
  svg.append('g')// USED IN LINE, SCATTER AND BAR
    .classed('x-axis', true)
    .call(xAxis);// USED IN LINE, SCATTER AND BAR

  // Append the y-axis to the SVG
  svg.append('g')// USED IN LINE, SCATTER AND BAR
    .classed('y-axis', true)
    .call(yAxis);// USED IN LINE, SCATTER AND BAR
}


// Attempt at adding orientation option
// export default function createD3BarChart(data, selector, options) {
//   const { width } = options;
//   const { height } = options;
//   const { margin } = options;
//   const { orientation } = options; // Add the orientation option to the options object

//   // Create the x and y scales based on the orientation option
//   const xScale = orientation === 'horizontal'
//     ? d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).nice().range([margin.left, width - margin.right])
//     : d3.scaleBand().domain(data.map((d) => d.label)).range([margin.left, width - margin.right]).padding(0.1);

//   const yScale = orientation === 'horizontal'
//     ? d3.scaleBand().domain(data.map((d) => d.label)).range([margin.top, height - margin.bottom]).padding(0.1)
//     : d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).nice().range([height - margin.bottom, margin.top]);

//   // Define the x-axis and y-axis functions based on the orientation option
//   const xAxis = orientation === 'horizontal'
//     ? (g) => g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickSizeOuter(0))
//     : (g) => g.attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisLeft(yScale));

//   const yAxis = orientation === 'horizontal'
//     ? (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale))
//     : (g) => g.attr('transform', `translate(${margin.left},0)`).call(d3.axisBottom(xScale).tickSizeOuter(0));

//   // Select the element with the given selector and create an SVG container
//   const svg = d3.select(selector)
//     .append('svg')
//     .classed('bar-chart', true)
//     .attr('width', width)
//     .attr('height', height);

//   // Append a group element for the bars, set the fill color and bind the data
//   svg.append('g')
//     .attr('fill', `${options.color}`)
//     .selectAll('rect')
//     .data(data)
//     .join('rect') // Create a rectangle for each data point
//     .attr('x', (d) => xScale(orientation === 'horizontal' ? d.value : d.label)) // Set the x position using the x scale
//     .attr('y', (d) => yScale(orientation === 'horizontal' ? d.label : d.value)) // Set the y position using the y scale
//     .attr('width', (d) => xScale.bandwidth()) // Set the width based on the x scale's bandwidth
//     .attr('height', (d) => (orientation === 'horizontal' ? yScale.bandwidth() : yScale(0) - yScale(d.value))); // Set the height based on the y scale's bandwidth or the data value

//   // Append a group element for the x-axis and call the xAxis function
//   svg.append('g')
//     .classed('x-axis', true)
//     .call(xAxis);

//   // Append the y-axis to the SVG
//   svg.append('g')
//     .classed('y-axis', true)
//     .call(yAxis);
// }
