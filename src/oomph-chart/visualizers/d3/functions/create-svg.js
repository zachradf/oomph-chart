export default function createSVG(selector, chart, options) {
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
      .attr('height', options.height)
      .attr('id', options.chartClass + options.chartNumber);

    if (chart === 'pie' || chart === 'donut' || chart === 'gauge' || chart === 'polar' || chart === 'radar') {
      svg.classed(`${options.chartClass}`, true);
      const g = svg.append('g');
      if (chart === 'polar') {
        g.attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);
      }

      // if (chart === 'donut') {
      //  svg.attr('viewBox', `0 0 ${options.width} ${options.height}`);
      // }

      svg = g;
    } else {
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
        .classed(`${options.chartClass}`, true);
    }
    return svg;
  }
  if (chart === 'pie' || chart === 'donut' || chart === 'gauge' || chart === 'polar' || chart === 'radar' || chart === 'chord' || chart === 'cluster') {
    svg = d3.select(selector)
      .append('svg')
      .classed(`${options.chartClass}`, true)
      .attr('id', options.chartClass + options.chartNumber)
      .attr('width', options.width)
      .attr('height', options.height)
      .append('g');
    if (chart !== 'pie') {
      svg.attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);
    }
    if (chart === 'bubble') {
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
      .attr('id', options.chartClass + options.chartNumber)
      .attr('width', options.width)
      .attr('height', options.height);
  }
  return svg;
}
