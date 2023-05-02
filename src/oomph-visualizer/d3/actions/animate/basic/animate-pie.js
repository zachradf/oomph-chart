export default function animatePie(generalElements, data, duration, options) {
  const svg = d3.select('svg');
  console.log(svg);

  // Select the existing 'g' element or append one if it doesn't exist
  const chartGroup = svg.select('g').empty()
    ? svg.append('g').attr('transform', `translate(${options.width / 2}, ${options.height / 2})`)
    : svg.select('g');

  const color = d3.scaleOrdinal()
    .domain(data.map((d) => d.x))
    .range(d3.schemeCategory10);

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
  const update = chartGroup.selectAll('path')
    .data(pie(data));

  update.join(
    (enter) => enter.append('path')
      .attr('fill', (d) => color(d.data.y))
      .attr('stroke', 'white')
      .attr('stroke-width', '2px')
      .attr('d', arc),
    (update) => update.transition()
      .duration(duration)
      .attr('d', arc),
    (exit) => exit.remove(),
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
    (exit) => exit.remove(),
  );
}
