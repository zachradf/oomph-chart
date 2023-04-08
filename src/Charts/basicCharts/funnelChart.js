export default function createD3FunnelChart(data, selector, options) {
  const {
    width, height, margin, colors,
  } = options;

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.1);

  const x = d3
    .scaleLinear()
    .domain([0, totalValue])
    .range([margin.left, width - margin.right]);

  const svg = d3
    .select(selector)
    .append('svg')
    .classed('funnel-chart', true)
    .attr('width', width)
    .attr('height', height);

  const colorScale = d3.scaleOrdinal().domain(data.map((d) => d.name)).range(colors);

  const funnel = svg
    .selectAll('g')
    .data(data)
    .join('g')
    .attr('transform', (d, i) => `translate(0, ${y(d.name)})`);

  funnel
    .append('rect')
    .attr('x', (d) => (width - x(d.value) + x(0)) / 2)
    .attr('width', (d) => x(d.value) - x(0))
    .attr('height', y.bandwidth())
    .attr('fill', (d) => colorScale(d.name));

  const yAxis = (g) => g
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select('.domain').remove());

  const xAxis = (g) => g
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  svg.append('g').classed('y-axis', true).call(yAxis);
  svg.append('g').classed('x-axis', true).call(xAxis);
}
