import * as d3 from 'd3';
export default function createSVG(selector, graph, options) {
  let svg;
  if (options.stack) {
    const container = d3.select(selector)
      .append('div')
      .style('position', 'relative')
      .style('width', `${options.width}px`)
      .style('height', `${options.height}px`);

    svg = container
      .append('svg')
      .attr('width', options.width)
      .attr('height', options.height);

      const chartWrapper = d3.select('body')
      .append('div')
      .classed('chart-wrapper', true)
      .style('position', 'absolute')
      .style('top', '0')
      .style('left', '0');
  
    // Append the SVG element to the chartWrapper div
     svg = chartWrapper
      .append('svg')
      .attr('width', options.width)
      .attr('height', options.height)
      .classed(`${options.chartClass}`, true)
      // .attr('opacity', options.opacity || 1);

    return svg;
  }
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
