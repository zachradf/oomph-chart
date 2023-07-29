export default function createD3RadarChart(data, options, chartComponents) {
  const {
    width,
    height,
    colorScheme,
    maxValue,
    levels,
    xLabelFont,
    opacity,
    textAnchor,
    fontColor,
    fontSize,
    strokeColor,
    strokeWidth,
    showCategories,
  } = options;
  const { svg } = chartComponents;
  const radius = Math.min(width, height) / 2.1;

  const angleSlice = (2 * Math.PI) / data.length;

  const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

  const lineGenerator = d3.lineRadial().curve(d3.curveLinearClosed);

  // Draw the radar chart
  svg
    .selectAll('.radar-chart-path')
    .data([data])
    .join('path')
    .attr('class', 'radar-chart-path')
    .attr('d', lineGenerator.radius((d) => rScale(d.y)).angle((d, i) => i * angleSlice))
    .attr('fill', colorScheme[0])
    .attr('fill-opacity', opacity)
    .attr('stroke', colorScheme[1])
    .attr('stroke-width', strokeWidth || 2);

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
      .attr('stroke', strokeColor)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', strokeWidth || 0.5);
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
    .attr('text-anchor', textAnchor)
    .style('fill', fontColor)
    .attr('font-size', fontSize);

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
    .attr('stroke', strokeColor)
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', strokeWidth);

  // Add ticks
  if (showCategories) {
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
        .attr('stroke', strokeColor)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', strokeWidth || 0.5);

      // Add level labels
      svg
        .append('text')
        .attr('x', 0)
        .attr('y', -levelFactor)
        .attr('class', 'level-label')
        .style('font-size', `${xLabelFont}px`)
        .style('fill', fontColor)
        .style('text-anchor', 'middle')
        .text(maxValue * (level + 1) / levels);
    }
  }
}
