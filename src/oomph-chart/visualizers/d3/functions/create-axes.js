import { createXAxisLine, createYAxisLine } from './axis-lines.js';

export default function createAxes(data, chart, options) {
  const nonAxialCharts = ['polar', 'radar', 'pie', 'donut', 'heatmap', 'bubble', 'sun', 'chord'];

  if (nonAxialCharts.includes(chart)) {
    return {};
  }

  const {
    margin, width, height, yDomain,
  } = options;
  console.log('in createAxes', chart);
  const chartFunctions = {
    bar: (data) => createBarBox(data, options),
    box: (data) => createBarBox(data, options),
    funnel: (data) => createFunnel(data, options),
    waterfall: (data) => createWaterfall(data, options),
    stackedbar: (data) => createStackedBar(data, options),
    default: (data) => createDefault(data, options),
  };

  const scaleFunctions = {
    bar: () => d3.scaleLinear()
      .domain(yDomain || [0, d3.max(data, (d) => d.y)]).nice()
      .range([height - margin.bottom, margin.top]),
    funnel: () => d3.scaleBand()
      .domain(yDomain || data.map((d) => d.x))
      .range([margin.top, height - margin.bottom])
      .padding(0.1),
    stackedbar: () => d3.scaleLinear()
      .domain(yDomain || [0, d3.max(data, (d) => d3.sum(d.children.map((v) => v.value)))])
      .nice()
      .range([height - margin.bottom, margin.top]),
    waterfall: () => d3.scaleLinear()
      .domain(yDomain || [d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
      .nice()
      .range([height - margin.bottom, margin.top]),
    default: () => d3.scaleLinear()
      .domain(yDomain || d3.extent(data, (d) => d.y)).nice()
      .range([height - margin.bottom, margin.top]),
  };

  const xAxisColor = options.xAxisColor || '#000';
  const xAxisPosition = options.xAxisPosition || (height - margin.bottom);
  const xAxisWidth = options.xAxisWidth || 2;
  const xTickExtension = options.xTickExtension || 0;
  const xTickFrequency = options.xTickFrequency || width / 80;
  const xTickLength = options.xTickLength || width - margin.left - margin.right;
  const x = (chartFunctions[chart] || chartFunctions.default)(data);

  const yAxisColor = options.yAxisColor || '#000';
  const yAxisPosition = options.yAxisPosition || margin.left;
  const yAxisWidth = options.yAxisWidth || 2;
  const yTickExtension = options.yTickExtension || 0;
  const yTickFrequency = options.yTickFrequency || width / 80;
  const yTickLength = options.yTickLength || height - margin.top - margin.bottom;
  const y = (scaleFunctions[chart] || scaleFunctions.default)();

  let xAxisBBox;
  let yAxisBBox;

  const xAxis = (g) => {
    g.attr('transform', `translate(0,${xAxisPosition})`)
      .call(d3.axisBottom(x).ticks(xTickFrequency).tickSizeOuter(0).tickSize(0))
      .call((g) => {
        g.selectAll('.tick')
          .each(function () {
            d3.select(this)
              .append('line')
              .attr('stroke', `${xAxisColor}`)
              .attr('stroke-width', `${xAxisWidth}`)
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
    xAxisBBox = g.node().getBBox();
  };

  const yAxis = (g) => {
    g.attr('transform', `translate(${yAxisPosition},0)`)
      .call(d3.axisLeft(y).tickSize(0).ticks(chart === 'stackedbar' ? null : yTickFrequency))
      .call((g) => {
        g.selectAll('.tick')
          .each(function () {
            d3.select(this)
              .append('line')
              .attr('stroke', `${yAxisColor}`)
              .attr('x2', yTickLength)
              .attr('stroke-width', `${yAxisWidth}`)
              .attr('class', 'tick-line') // Add a class to the tick lines for non-waterfall charts
              .attr('opacity', options.yTickOpacity || 1);
            d3.select(this)
              .append('line')
              .attr('stroke', `${yAxisColor}`)
              .attr('x2', -yTickExtension)
              .attr('class', 'tick-line')
              .attr('opacity', options.yTickOpacity || 1);
          });

        if (options.yLine) {
          createYAxisLine(g, options, xAxisPosition);
        }
      });
    yAxisBBox = g.node().getBBox();
  };
  return {
    x, y, xAxis, yAxis, xAxisBBox, yAxisBBox,
  };
}

function createBarBox(data, options) {
  data.sort((a, b) => d3.ascending(a.x, b.x));
  if (typeof data[0].x === 'string') {
    return d3.scaleBand()
      .domain(options.xDomain ? options.xDomain : data.map((d) => d.x))
      .range([options.margin.left, options.width - options.margin.right])
      .padding(0.1);
  }
  return d3.scaleLinear()
    .domain(options.xDomain ? options.xDomain : d3.extent(data, (d) => d.x)).nice()
    .range([options.margin.left, options.width - options.margin.right]);
}

function createFunnel(data, options) {
  const totalValue = data.reduce((acc, curr) => acc + curr.y, 0);
  return d3.scaleLinear()
    .domain(options.xDomain ? options.xDomain : [0, totalValue])
    .range([options.margin.left, options.width - options.margin.right]);
}

function createWaterfall(data, options) {
  return d3.scaleBand()
    .domain(options.xDomain ? options.xDomain : [data[0].category, ...data.map((d) => d.category), data[data.length - 1].category])
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}

// function createStackedBar(data, options) {
//   return d3.scaleBand()
//     .domain(options.xDomain ? options.xDomain : data.map((d) => d.category))
//     .range([options.margin.left, options.width - options.margin.right])
//     .padding(0.1);
// }
function createStackedBar(data, options) {
  return d3.scaleBand()
    .domain(options.xDomain ? options.xDomain : data.map((d) => d.category))
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}

function createDefault(data, options) {
  return d3.scaleLinear()
    .domain(options.xDomain ? options.xDomain : d3.extent(data, (d) => d.x)).nice()
    .range([options.margin.left, options.width - options.margin.right]);
}
