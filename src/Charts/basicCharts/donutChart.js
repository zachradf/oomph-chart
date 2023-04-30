export default function createD3DonutChart(data, options, generalElements) {
  const { radius } = options;
  const { svg } = generalElements;

  const chartGroup = svg.append('g')
    .attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);

  const arc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  const pie = d3.pie()
    .sort(null)
    .value((d) => d.y);

  const arcs = chartGroup.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => options.fillColor[i])
    .attr('stroke', 'blue')
    .style('stroke-width', '2px');

  arcs.append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', `${options.textAnchor}`)
    .text((d) => d.data.x)
    .style('fill', 'red')
    .style('font-size', `${options.fontSize}`)
    .style('font-weight', 'bold');
}
