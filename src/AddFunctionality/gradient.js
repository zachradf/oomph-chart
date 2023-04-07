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
// export default function applyColorGradient(selector, color1, color2, type, axis) {
//   const svg = d3.select(selector).select('svg');

//   if (type === 'BAR') {
//     const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.value);
//     const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.value);

//     const colorScale = d3.scaleLinear()
//       .domain([minValue, maxValue])
//       .range([color1, color2]);

//     svg.selectAll('rect').style('fill', (d) => colorScale(d.value));
//   } else if (type === 'SCATTER') {
//     let maxValue; let minValue; let
//       valueAccessor;
//     if (axis === 'x') {
//       maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.x);
//       minValue = d3.min(svg.selectAll('circle').data(), (d) => d.x);
//       valueAccessor = (d) => d.x;
//     } else if (axis === 'y') {
//       maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.y);
//       minValue = d3.min(svg.selectAll('circle').data(), (d) => d.y);
//       valueAccessor = (d) => d.y;
//     }

//     const colorScale = d3.scaleLinear()
//       .domain([minValue, maxValue])
//       .range([color1, color2]);

//     svg.selectAll('circle').style('fill', (d) => colorScale(valueAccessor(d)));
//   }
// }

export default function applyColorGradient(selector, color1, color2, type, axis) {
  const svg = d3.select(selector).select('svg');

  // Create the gradient element
  const gradient = svg.append('linearGradient')
    .attr('id', 'gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('x2', 0);

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', color1);

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', color2);

  if (type === 'BAR') {
    const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.value);
    const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.value);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    gradient.attr('y1', svg.select('.y-axis').node().getBBox().height)
      .attr('y2', 0);

    svg.selectAll('rect').style('fill', 'url(#gradient)');
  } else if (type === 'SCATTER') {
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
}
