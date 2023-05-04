export default function animateDonutChart(chartComponents, data, duration, options) {
  const svg = d3.select('svg');
  console.log(svg);

  // Select the existing 'g' element or append one if it doesn't exist
  const chartGroup = svg.select('g').empty()
    ? svg.append('g').attr('transform', `translate(${options.width / 2}, ${options.height / 2})`)
    : svg.select('g');

  const pie = d3.pie()
    .value((d) => d.y)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(options.radius * 0.5)
    .outerRadius(options.radius * 0.8);

  const labelArc = d3.arc()
    .innerRadius(options.radius * 0.6)
    .outerRadius(options.radius * 0.6);

  // Update arcs
  const updateArcs = chartGroup.selectAll('.arc')
    .data(pie(data));

  updateArcs.join(
    (enter) => {
      const arcs = enter.append('g').attr('class', 'arc');
      arcs.append('path')
        .attr('fill', (d, i) => options.fillColor[i])
        .attr('stroke', 'blue')
        .style('stroke-width', '2px')
        .attr('d', arc);
      return arcs;
    },

    (update) => update.select('path').transition()
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
      .style('fill', 'red')
      .style('font-size', `${options.fontSize}`)
      .style('font-weight', 'bold')
      .text((d) => d.data.x),
    (update) => update.transition()
      .duration(duration)
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .text((d) => d.data.x),
    (exit) => exit.remove(),
  );
}
