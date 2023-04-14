export default function createD3RadarChart(data, selector, options) {
  const {
    width, height, margin, colors, maxValue, levels,
  } = options;

  const radius = Math.min(width, height) / 2;

  const angleSlice = (2 * Math.PI) / data.length;

  const svg = d3
    .select(selector)
    .append('svg')
    .classed('radar-chart', true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

  const lineGenerator = d3.lineRadial().curve(d3.curveLinearClosed);

  // Draw the radar chart
  svg
    .selectAll('.radar-chart-path')
    .data([data])
    .join('path')
    .attr('class', 'radar-chart-path')
    .attr('d', lineGenerator.radius((d) => rScale(d.y)).angle((d, i) => i * angleSlice))
    .attr('fill', colors[0])
    .attr('fill-opacity', 0.6)
    .attr('stroke', colors[1])
    .attr('stroke-width', 2);

  // Add ticks
  for (let level = 0; level < levels; level++) {
    const levelFactor = radius * ((level + 1) / levels);
    svg
      .selectAll(`.ticks-${level}`)
      .data(data)
      .join('line')
      .attr('class', `ticks ticks-${level}`)
      .attr('x1', (d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y1', (d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('x2', (d, i) => levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2))
      .attr('y2', (d, i) => levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2))
      .attr('stroke', 'gray')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 0.5);
  }

  // Add labels
  svg
    .selectAll('.label')
    .data(data)
    .join('text')
    .attr('class', 'label')
    .attr('x', (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y', (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
    .text((d) => d.x)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px');

  // Connect labels with lines
  svg
    .selectAll('.label-line')
    .data(data)
    .join('line')
    .attr('class', 'label-line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y2', (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr('stroke', 'gray')
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', 0.5);
}
