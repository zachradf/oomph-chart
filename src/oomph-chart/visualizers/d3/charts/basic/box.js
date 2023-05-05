export default function createD3BoxPlot(data, options, chartComponents) {
  // TODO try to accept multiple data set shapes, and calculate the mean, median, etc. from the data
  const fillColor = options.fillColor || 'steelblue';
  const { x } = chartComponents;
  const { y } = chartComponents;
  const { xAxis } = chartComponents;
  const { yAxis } = chartComponents;
  const { svg } = chartComponents;

  function update(data) {
    x.domain(data.map((d) => d.category));
    y.domain([d3.min(data, (d) => d.min), d3.max(data, (d) => d.max)]).nice();

    svg.selectAll('.x-axis')
      .call(xAxis);

    svg.selectAll('.y-axis')
      .call(yAxis);

    const boxWidth = Math.min(x.bandwidth(), 50);

    const box = svg.selectAll('.box')
      .data(data, (d) => d.category)
      .join('g')
      .attr('class', 'box')
      .attr('transform', (d) => `translate(${x(d.category)},0)`);

    box.selectAll('.min')
      .data((d) => [d])
      .join('line')
      .attr('class', 'min')
      .attr('x1', boxWidth / 2)
      .attr('x2', boxWidth / 2)
      .attr('y1', (d) => y(d.min))
      .attr('y2', (d) => y(d.q1))
      .attr('stroke', 'black');

    box.selectAll('.max')
      .data((d) => [d])
      .join('line')
      .attr('class', 'max')
      .attr('x1', boxWidth / 2)
      .attr('x2', boxWidth / 2)
      .attr('y1', (d) => y(d.q3))
      .attr('y2', (d) => y(d.max))
      .attr('stroke', 'black');

    box.selectAll('.box-rect')
      .data((d) => [d])
      .join('rect')
      .attr('class', 'box-rect')
      .attr('x', 0)
      .attr('width', boxWidth)
      .attr('y', (d) => y(d.q3))
      .attr('height', (d) => y(d.q1) - y(d.q3))
      .attr('fill', fillColor);
  }

  update(data);

  return { update };
}
