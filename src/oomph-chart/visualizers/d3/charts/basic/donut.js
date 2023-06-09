export default function createD3DonutChart(data, options, chartComponents) {
  const { svg } = chartComponents;

  const chartGroup = svg.append('g');

  const arc = d3.arc()
    .innerRadius(options.innerRadius)
    .outerRadius(options.outerRadius);

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
    .attr('fill', (d, i) => options.colorScheme[i])
    .attr('stroke', `${options.strokeColor}`)
    .style('stroke-width', `${options.strokeWidth}` || 2);

  arcs.append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', `${options.textAnchor}`)
    .text((d) => d.data.x)
    .style('fill', 'red')
    .style('font-size', `${options.fontSize}`)
    .style('font-weight', 'bold');
}
