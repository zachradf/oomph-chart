export default function createD3BarChart(data, options, generalElements) {
  const { x } = generalElements;
  const { y } = generalElements;
  const { svg } = generalElements;

  // Sort the data by the x value
  data.sort((a, b) => d3.ascending(a.x, b.x));

  // Determine if the x scale is linear or band
  const isLinearScale = x.domain()[1] !== undefined && typeof x.domain()[1] === 'number';

  // Calculate the bar width depending on the x scale type
  const barWidth = isLinearScale ? (options.width - options.margin.left - options.margin.right) / data.length : x.bandwidth();

  // Append a group element for the bars, set the fill color, and bind the data
  svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d) => isLinearScale ? x(d.x) - barWidth / 2 : x(d.x))
    .attr('y', (d) => d.y >= 0 ? y(d.y) : y(0))
    .attr('height', (d) => d.y >= 0 ? y(0) - y(d.y) : y(d.y) - y(0))
    .attr('fill', options.color)
    .attr('width', barWidth);
}
