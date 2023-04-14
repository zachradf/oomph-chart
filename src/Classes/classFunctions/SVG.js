//   THIS DEFINES ALL SVG ELEMENTS, SHOULD BE PASSED TO EACH CHART OR SET IN OPTIONS
export default function createSVG(selector, graph, options) {
  let svg;
  if (graph === 'PIE' || graph === 'DONUT' || graph === 'GAUGE' || graph === 'POLAR' || graph === 'RADAR') {
    svg = d3.select(selector)
      .append('svg')
      .classed(`${options.chartClass}`, true)
      .attr('width', options.width)
      .attr('height', options.height)
      .append('g')
      .attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);

    if (graph === 'DONUT') {
      svg.attr('viewBox', `0 0 ${options.width} ${options.height}`);
    } else if (graph === 'BUBBLE') {
      svg = d3.select(selector)
        .append('svg')
        .classed('bubble-chart', true)
        .attr('width', options.diameter)
        .attr('height', options.diameter);
    }
  } else {
    svg = d3.select(selector)
      .append('svg')
      .classed(`${options.chartClass}`, true)
      .attr('width', options.width)
      .attr('height', options.height);
  }
  return svg;
}
