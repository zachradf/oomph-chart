// animateAreaChart.js
export default function animateArea(chart, sortedData, chartComponents, options, duration) {
  const area = d3.area()
    .x((d) => chartComponents.x(d.x))
    .y0(options.height - options.margin.bottom)
    .y1((d) => chartComponents.y(d.y));

  chart.select('.area-chart0')
    .datum(sortedData)
    .transition()
    .duration(duration)
    .attr('d', area(sortedData));
}
