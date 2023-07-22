export default function createChordDiagram(data, options, chartComponents) {
  const {
    width,
    height,
    colorScheme,
    strokeColor,
    outerRadius,
    innerRadius,
  } = options;
  const color = d3.scaleOrdinal()
    .domain(d3.range(colorScheme.length))
    .range(colorScheme);  

  function convertToMatrix(chordData) {
    const labels = chordData.map((d) => d.category);
    console.log("Labels: ", labels);  // Debug line

    const matrix = chordData.map((d) =>
      labels.map((label) =>
        d.children.find((child) => child.name === label)?.value || 0
      )
    );
    matrix.push(labels);
        console.log(matrix, '====');

    return matrix;
  }

  const matrixData = convertToMatrix(data);

  const labels = matrixData.pop();
  console.log(labels, 'labels')

  const { svg } = chartComponents;

  const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const ribbon = d3.ribbon().radius(innerRadius);

  const chords = chord(matrixData);

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
