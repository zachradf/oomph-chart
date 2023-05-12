export function arrow(svg, options) {
  const stemLength = options.stemLength || 5;
  const arrowWidth = options.arrowWidth || 100;
  const arrowHeight = options.arrowHeight || 10;
  const arrowPoints = `M0,${arrowHeight / 2} L${stemLength},${arrowHeight / 2} L${stemLength},0 L${stemLength + arrowWidth}, ${arrowHeight / 2} L${stemLength},${arrowHeight} L${stemLength},${arrowHeight / 2} Z`;

  return svg
    .append('path')
    .attr('d', arrowPoints)
    .attr('fill', options.fillColor);
}
export function ring(svg, options) {
  const arcGenerator = d3.arc()
    .innerRadius(options.innerRadius || 10)
    .outerRadius(options.outerRadius || 20)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  return svg
    .append('path')
    .attr('d', arcGenerator())
    .attr('fill', options.fillColor);
}

export function circle(svg, options) {
  return svg
    .append('circle')
    .attr('r', options.radius) // You can adjust the radius here or add it as an option
    .attr('fill', options.fillColor)
    .attr('opacity', options.opacity || 1);
}
export function rectangle(svg, options) {
  const { fillColor, width, height } = options;

  return svg.append('rect')
    .attr('width', width || 50)
    .attr('height', height || 30)
    .attr('fill', fillColor);
}
export function ellipse(svg, options) {
  const { fillColor, rx, ry } = options;

  return svg.append('ellipse')
    .attr('rx', rx || 30)
    .attr('ry', ry || 15)
    .attr('fill', fillColor);
}
