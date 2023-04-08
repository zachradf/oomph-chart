export default function createD3PolarChart(data, selector, options) {
  const {
    width, height, margin, colors, innerRadius, outerRadius,
  } = options;

  const radius = Math.min(width, height) / 2;

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, 2 * Math.PI])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([innerRadius, outerRadius]);

  const svg = d3
    .select(selector)
    .append('svg')
    .classed('polar-chart', true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const colorScale = d3.scaleOrdinal().domain(data.map((d) => d.name)).range(colors);

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius((d) => y(d.value))
    .startAngle((d) => x(d.name))
    .endAngle((d) => x(d.name) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

  svg
    .selectAll('path')
    .data(data)
    .join('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.name));

  // Add names
  svg
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('x', (d) => (y(d.value) + 10) * Math.cos((x(d.name) + x.bandwidth() / 2) - Math.PI / 2))
    .attr('y', (d) => (y(d.value) + 10) * Math.sin((x(d.name) + x.bandwidth() / 2) - Math.PI / 2))
    .text((d) => d.name)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px');
}
