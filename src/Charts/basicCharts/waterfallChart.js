// TODO add negative and positive color change
export default function createD3WaterfallChart(data, selector, options) {
  const { width } = options;
  const { height } = options;
  const { margin } = options;

  // Adjust the domain of the x scale to add extra space for the first and last bars
  const x = d3.scaleBand()
    .domain([data[0].category, ...data.map((d) => d.category), data[data.length - 1].category])
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // Adjust the domain of the y scale to fit the data set
  const y = d3.scaleLinear()
    .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = (g) => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  const yAxis = (g) => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.selectAll('.tick line').clone()
      .attr('x2', width - margin.left - margin.right)
      .attr('stroke-opacity', 0.1));

  const svg = d3.select(selector)
    .append('svg')
    .classed('waterfall-chart', true)
    .attr('width', width)
    .attr('height', height);

  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => x(d.category))
    .attr('y', (d) => y(d.start))
    .attr('height', (d) => Math.abs(y(d.end) - y(d.start)))
    .attr('width', x.bandwidth())
    .attr('fill', options.color);

  svg.append('g')
    .classed('x-axis', true)
    .call(xAxis);

  svg.append('g')
    .classed('y-axis', true)
    .call(yAxis);
}
