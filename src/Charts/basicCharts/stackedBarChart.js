export default function createD3StackedBarChart(data, selector, options) {
  const { width } = options;
  const { height } = options;
  const { margin } = options;

  // Create the x scale using scaleBand to handle categorical data
  const x = d3.scaleBand()
    .domain(data.map((d) => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // Create the y scale using scaleLinear for numerical data
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d3.sum(d.values.map((v) => v.value)))])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Create a color scale using the color scheme provided
  const color = d3.scaleOrdinal()
    .domain(data[0].values.map((v) => v.group))
    .range(options.color);

  // Create a stack generator to transform the data into stacked form
  const stack = d3.stack()
    .keys(data[0].values.map((v) => v.group))
    .value((d, key) => (d.find((v) => v.group === key)).value);

  // Create the x-axis using the x scale
  const xAxis = (g) => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Create the y-axis using the y scale
  const yAxis = (g) => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, 's'))
    .call((g) => g.select('.domain').remove());

  // Select the element with the given selector and create an SVG container
  const svg = d3.select(selector)
    .append('svg')
    .classed('stacked-bar-chart', true)
    .attr('width', width)
    .attr('height', height);

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
    .attr('x', (d, i) => x(data[i].label))
    .attr('y', (d) => y(d[1]))
    .attr('height', (d) => y(d[0]) - y(d[1]))
    .attr('width', x.bandwidth());

  // Append a group element for the x-axis and call the xAxis function
  svg.append('g')
    .classed('x-axis', true)
    .call(xAxis);

  // Append the y-axis to the SVG
  svg.append('g')
    .classed('y-axis', true)
    .call(yAxis);
}
