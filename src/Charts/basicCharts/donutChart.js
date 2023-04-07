export default function createD3DonutChart(data, selector, options) {
  const { width, height, radius } = options;

  const color = d3.scaleOrdinal()
    .range(options.color);

  const arc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  const pie = d3.pie()
    .sort(null)
    .value((d) => d.value);

  //   const svg = d3.select(selector)
  //     .append('svg')
  //     .classed('donut-chart', true)
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', `translate(${width / 2},${height / 2})`);
  const svg = d3.select(selector)
    .append('svg')
    .classed('donut-chart', true)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMin')
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const arcs = svg.selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    // .attr('fill', `${options.fillColor}}`)
    // .attr('fill', (d) => color(d.data.label))
    .attr('fill', (d, i) => options.fillColor[i])
    .attr('stroke', 'blue')
    .style('stroke-width', '2px');

  arcs.append('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text((d) => d.data.label)
    .style('fill', 'red')
    .style('font-size', '12px')
    .style('font-weight', 'bold');
}
// export default function createD3DonutChart(data, selector, options) {
//   const { width, height, radius } = options;

//   const labelColorMapping = data.reduce((acc, d, i) => {
//     acc[d.label] = options.color[i];
//     return acc;
//   }, {});

//   const arc = d3.arc()
//     .innerRadius(radius * 0.5)
//     .outerRadius(radius * 0.8);

//   const pie = d3.pie()
//     .sort(null)
//     .value((d) => d.value);

//   const svg = d3.select(selector)
//     .append('svg')
//     .classed('donut-chart', true)
//     .attr('width', width)
//     .attr('height', height)
//     .attr('viewBox', `0 0 ${width} ${height}`)
//     .attr('preserveAspectRatio', 'xMinYMin')
//     .append('g')
//     .attr('transform', `translate(${width / 2},${height / 2})`);

//   const arcs = svg.selectAll('.arc') // Corrected here: .selectAll('.arc')
//     .data(pie(data))
//     .enter()
//     .append('g')
//     .attr('class', 'arc');

//   arcs.append('path')
//     .attr('d', arc)
//     .attr('fill', (d, i) => options.fillColor[i])
//     //   .attr('fill', (d) => labelColorMapping[d.data.label])
//     .attr('stroke', 'blue')
//     .style('stroke-width', '2px');

//   arcs.append('text')
//     .attr('transform', (d) => `translate(${arc.centroid(d)})`)
//     .attr('text-anchor', 'middle')
//     .text((d) => d.data.label)
//     .style('fill', 'red')
//     .style('font-size', '12px')
//     .style('font-weight', 'bold');
//}
