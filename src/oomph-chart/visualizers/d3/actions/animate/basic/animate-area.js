// animateAreaChart.js
export default function animateArea(chart, sortedData, chartComponents, options, duration) {
  console.log('animateArea', chart, sortedData, chartComponents, options, duration);
  const { y } = chartComponents;
  const area = d3.area()
    .x((d) => chartComponents.x(d.x))
    .y0((d) => (d.y >= 0 ? y(0) : y(-d.y)))
    .y1((d) => chartComponents.y(d.y));
  console.log('chart', chart);
  chart.select('svg .area0')
    .datum(sortedData)
    .transition()
    .duration(duration)
    .attr('d', area(sortedData));
}
