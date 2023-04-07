// for bar chart
// export default function applyColorGradient(selector, color1, color2) {
//   const svg = d3.select(selector).select('svg');
//   const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.value);
//   const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.value);

//   const colorScale = d3.scaleLinear()
//     .domain([minValue, maxValue])
//     .range([color1, color2]);

//   svg.selectAll('rect').style('fill', (d) => colorScale(d.value));
// }
// for scatter plot
export default function applyColorGradient(selector, color1, color2, axis) {
  const svg = d3.select(selector).select('svg');

  let maxValue; let minValue; let
    valueAccessor;
  if (axis === 'x') {
    maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.x);
    minValue = d3.min(svg.selectAll('circle').data(), (d) => d.x);
    valueAccessor = (d) => d.x;
  } else if (axis === 'y') {
    maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.y);
    minValue = d3.min(svg.selectAll('circle').data(), (d) => d.y);
    valueAccessor = (d) => d.y;
  }

  const colorScale = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([color1, color2]);

  svg.selectAll('circle').style('fill', (d) => colorScale(valueAccessor(d)));
}
