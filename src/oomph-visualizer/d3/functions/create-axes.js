import { createXAxisLine, createYAxisLine } from './axis-lines.js';

export default function createAxes(data, chart, options) {
  let x;

  switch (chart) {
    case 'bar':
    case 'box':
      data.sort((a, b) => d3.ascending(a.x, b.x));
      if (typeof data[0].x === 'string') {
        x = d3.scaleBand()
          .domain(data.map((d) => d.x))
          .range([options.margin.left, options.width - options.margin.right])
          .padding(0.1);
      } else {
        x = d3.scaleLinear()
          .domain(d3.extent(data, (d) => d.x)).nice()
          .range([options.margin.left, options.width - options.margin.right]);
      }
      break;
    case 'funnel':
      const totalValue = data.reduce((acc, curr) => acc + curr.y, 0);
      x = d3
        .scaleLinear()
        .domain([0, totalValue])
        .range([options.margin.left, options.width - options.margin.right]);
      break;
    case 'waterfall':
      x = d3.scaleBand()
        .domain([data[0].category, ...data.map((d) => d.category), data[data.length - 1].category])
        .range([options.margin.left, options.width - options.margin.right])
        .padding(0.1);
      break;
    case 'stackedbar':
      x = d3.scaleBand()
        .domain(data.map((d) => d.category))
        .range([options.margin.left, options.width - options.margin.right])
        .padding(0.1);
      break;
    default:
      x = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.x)).nice()
        .range([options.margin.left, options.width - options.margin.right]);
  }

  // Convert this to a switch case
  const scaleFunctions = {
    bar: () => d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)]).nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
    funnel: () => d3.scaleBand()
      .domain(data.map((d) => d.x))
      .range([options.margin.top, options.height - options.margin.bottom])
      .padding(0.1),
    stackedbar: () => d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d3.sum(d.values.map((v) => v.value)))])
      .nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
    waterfall: () => d3.scaleLinear()
      .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
      .nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
    default: () => d3.scaleLinear()
      .domain(d3.extent(data, (d) => d.y)).nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
  };

  const y = (scaleFunctions[chart] || scaleFunctions.default)();
  const yTickLength = options.yTickLength || options.height - options.margin.top - options.margin.bottom;
  const xTickLength = options.xTickLength || options.width - options.margin.left - options.margin.right;
  const xTickExtension = options.xTickExtension || 0;
  const yTickExtension = options.yTickExtension || 0;
  const xTickFrequency = options.xTickFrequency || options.width / 80;
  const yTickFrequency = options.yTickFrequency || options.width / 80;
  const xAxisPosition = options.xAxisPosition || (options.height - options.margin.bottom);
  const yAxisPosition = options.yAxisPosition || options.margin.left;
  const xAxisColor = options.xAxisColor || '#000';
  const yAxisColor = options.yAxisColor || '#000';

  const xAxis = (g) => {
    g.attr('transform', `translate(0,${xAxisPosition})`)
      .call(d3.axisBottom(x).ticks(xTickFrequency).tickSizeOuter(0).tickSize(0))
      .call((g) => {
        g.selectAll('.tick')
          .each(function () {
            d3.select(this)
              .append('line')
              .attr('stroke', `${xAxisColor}`)
              .attr('y2', -xTickLength)
              .attr('opacity', options.xTickOpacity || 1);
            d3.select(this)
              .append('line')
              .attr('stroke', `${xAxisColor}`)
              .attr('y2', -xTickExtension)
              .attr('opacity', options.xTickOpacity || 1);
          });
      });
    if (options.xLine) createXAxisLine(g, options, yAxisPosition);
  };
  let yAxis;
  switch (chart) {
    case 'waterfall':
      yAxis = (g) => g
        .attr('transform', `translate(${yAxisPosition},0)`)
        .call(d3.axisLeft(y).tickSize(0)).ticks(yTickFrequency)
        .call((g) => {
          g.selectAll('.tick')
            .each(function () {
              d3.select(this)
                .append('line')
                .attr('stroke', `${yAxisColor}`)
                .attr('x2', yTickLength)
                .attr('opacity', options.yTickOpacity || 1);
              d3.select(this)
                .append('line')
                .attr('stroke', `${yAxisColor}`)
                .attr('x2', -yTickExtension)
                .attr('opacity', options.yTickOpacity || 1);
            });
          if (options.yLine) {
            createYAxisLine(g, options, xAxisPosition);
          }
        });
      break;
    default:
      yAxis = (g) => g
        .attr('transform', `translate(${yAxisPosition},0)`)
        .call(d3.axisLeft(y).ticks(chart === 'stackedbar' ? null : yTickFrequency).tickSize(0))
        .call((g) => {
          g.selectAll('.tick')
            .each(function () {
              d3.select(this)
                .append('line')
                .attr('stroke', `${yAxisColor}`)
                .attr('x2', yTickLength)
                .attr('class', 'tick-line'); // Add a class to the tick lines
              d3.select(this)
                .append('line')
                .attr('stroke', `${yAxisColor}`)
                .attr('x2', -yTickExtension)
                .attr('class', 'tick-line');
            })
            .attr('opacity', options.yTickOpacity || 1);

          if (options.yLine) {
            createYAxisLine(g, options, xAxisPosition);
          }
        });
      break;
  }
  return {
    x, y, xAxis, yAxis,
  };
}
