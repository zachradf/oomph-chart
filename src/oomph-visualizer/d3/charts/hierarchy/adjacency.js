export default function createAdjacencyMatrix(data, options, generalElements) {
  const { svg } = generalElements;
  const g = svg
    .append('g')
    .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

  const x = d3.scaleBand()
    .domain(data.nodes.map((d) => d.id))
    .range([0, options.width - options.margin.left - options.margin.right])
    .padding(0.1);

  const y = d3.scaleBand()
    .domain(data.nodes.map((d) => d.id))
    .range([0, options.height - options.margin.top - options.margin.bottom])
    .padding(0.1);

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.links.map((d) => d.value))])
    .range([options.minColor, options.maxColor]);

  g.selectAll('rect')
    .data(data.links)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.source))
    .attr('y', (d) => y(d.target))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('fill', (d) => colorScale(d.value));

  // Add x-axis
  const xAxis = d3.axisBottom(x);
  g.append('g')
    .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
    .call(xAxis);

  // Add y-axis
  const yAxis = d3.axisLeft(y);
  g.append('g')
    .call(yAxis);
}
