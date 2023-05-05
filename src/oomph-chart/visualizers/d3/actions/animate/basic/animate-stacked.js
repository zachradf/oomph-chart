import animateBar from './animate-bar';

export default function createD3StackedBarChart(data, options, chartComponents) {
  const {
    x, y, svg,
  } = chartComponents;

  // Create a color scale using the color scheme provided
  const color = d3.scaleOrdinal()
    .domain(data[0].values.map((v) => v.group))
    .range(options.color);

  // Create a stack generator to transform the data into stacked form
  const stack = d3.stack()
    .keys(data[0].values.map((v) => v.group))
    .value((d, key) => (d.find((v) => v.group === key)).value);

  // Append a group element for the bars
  const bars = svg.append('g')
    .selectAll('g')
    .data(stack(data.map((d) => d.values)))
    .join('g')
    .attr('fill', (d) => color(d.key));

  // Append a rectangle for each data point in the stack
  bars.selectAll('rect')
    .data((d) => d)
    .join(
      (enter) => enter.append('rect')
        .attr('x', (d, i) => x(data[i].category))
        .attr('y', y(0))
        .attr('height', 0)
        .attr('width', x.bandwidth())
        .call((enterSelection) => animateBar(enterSelection, data, chartComponents, options, options.duration)),
      (update) => update
        .call((updateSelection) => animateBar(updateSelection, data, chartComponents, options, options.duration))
    )
    .transition()
    .duration(options.duration)
    .attr('x', (d, i) => x(data[i].category))
    .attr('y', (d) => y(d[1]))
    .attr('height', (d) => y(d[0]) - y(d[1]))
    .attr('width', x.bandwidth());

  // Remove bars that no longer have data
  bars.exit().remove();
}
