export default function createChordDiagram(data, options, chartComponents) {
  const {
    width,
    height,
    color,
    strokeColor,
    outerRadius,
    innerRadius,
  } = options;
  const labels = data.pop();

  const { svg } = chartComponents;

  const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const ribbon = d3.ribbon().radius(innerRadius);

  const chords = chord(data);

  const group = svg
    .append('g')
    .selectAll('g')
    .data(chords.groups)
    .join('g');

  group
    .append('path')
    .attr('class', 'arc')
    .attr('d', arc)
    .attr('fill', (d) => color(d.index))
    .attr('stroke', strokeColor);

  const ribbons = svg
    .append('g')
    .attr('fill-opacity', 0.75)
    .selectAll('path')
    .data(chords)
    .join('path')
    .attr('class', 'ribbon')
    .attr('d', ribbon)
    .attr('fill', (d) => color(d.source.index))
    .attr('stroke', strokeColor);

  group
    .append('text')
    .each(function (d) {
      const centroid = arc.centroid(d);
      d3.select(this)
        .attr('x', centroid[0])
        .attr('y', centroid[1])
        .attr('dy', '0.35em')
        .attr('text-anchor', `${options.textAnchor}`)
        .style('font-size', `${options.childTextSize}`)
        .text(labels[d.index]);
    });
}
