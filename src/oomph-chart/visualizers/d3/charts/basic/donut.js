export default function createD3DonutChart(data, options, chartComponents) {
  const {
    innerRadius, outerRadius, colorScheme, strokeColor, strokeWidth = 2, textAnchor, fontSize,
  } = options;
  const { svg } = chartComponents;

  const chartGroup = svg.append('g');

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

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
    .attr('fill', (d, i) => colorScheme[i])
    .attr('stroke', strokeColor)
    .style('stroke-width', strokeWidth);

  arcs.append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', textAnchor)
    .text((d) => d.data.x)
    .style('fill', 'red')
    .style('font-size', fontSize)
    .style('font-weight', 'bold');
}
