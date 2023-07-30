export default function animatePie(chartComponents, data, duration, options) {
  const { colorScheme } = options;
  const svg = d3.select('svg');
  console.log(svg);

  // Select the existing inner 'g' element or append one if it doesn't exist
  const chartGroup = svg.select('.pie0').empty()
    ? svg.select('g').append('g').attr('transform', `translate(${options.width / 2}, ${options.height / 2})`)
    : svg.select('.pie0');

  console.log('chartGroup', chartGroup);
  const color = d3.scaleOrdinal()
    .domain(d3.range(colorScheme.length))
    .range(colorScheme);

  const pie = d3.pie()
    .value((d) => d.y)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(options.radius);

  const labelArc = d3.arc()
    .innerRadius(options.radius * 0.6)
    .outerRadius(options.radius * 0.6);

  // Update paths
  // const update = chartGroup.selectAll('path')
  //   .data(pie(data));

  // update.join(
  //   (enter) => enter.append('path')
  //     .attr('fill', (d) => color(d.data.y))
  //     .attr('stroke', `${options.strokeColor}` || 'white')
  //     .attr('stroke-width', `${options.strokeWidth}` || 2)
  //     .attr('d', arc),
  //   (update) => update.transition()
  //     .duration(duration)
  //     .attr('d', arc),
  //   (exit) => exit.remove()
  // );
  // const originalAttributes = Array.from(chartGroup.node().attributes)
  //   .reduce((acc, attr) => {
  //     if (attr.name !== 'd') {
  //       acc[attr.name] = attr.value;
  //     }
  //     return acc;
  //   }, {});
  // const update = chartGroup.selectAll('path')
  //   .data(pie(data));

  // update.join(
  //   (enter) => enter.append('path')
  //     .attr('fill', (d, i) => color(i)) // Use the index i instead of d.data.y
  //     .attr('stroke', `${options.strokeColor}` || 'white')
  //     .attr('stroke-width', `${options.strokeWidth}` || 2)
  //     .attr('d', arc),
  //   (update) => update.transition()
  //     .duration(duration)
  //     .attr('d', arc),
  //   (exit) => exit.remove()
  // );
  // Capture existing fill colors
  const existingColors = chartGroup.selectAll('path').nodes().map((path) => path.getAttribute('fill'));

  // Update paths
  const update = chartGroup.selectAll('path')
    .data(pie(data));
  console.log('Fill color for index', chartGroup); // Debug output

  update.join(
    (enter) => enter.append('path')
      .attr('fill', (d, i) => {
        const fillColor = existingColors[i] || color(i);
        console.log('Fill color for index', i, ':', fillColor); // Debug output
        return fillColor;
      }),
    (update) => update.transition()
      .duration(duration)
      .attr('d', arc),
    (exit) => exit.remove()
  );

  // Update labels
  const labelUpdate = chartGroup.selectAll('text')
    .data(pie(data));

  labelUpdate.join(
    (enter) => enter.append('text')
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .attr('text-anchor', `${options.textAnchor}`)
      .attr('alignment-baseline', 'central')
      .text((d) => d.data.x),
    (update) => update.transition()
      .duration(duration)
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .text((d) => d.data.x),
    (exit) => exit.remove()
  );
}
