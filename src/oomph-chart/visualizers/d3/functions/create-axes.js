import { createXAxisLine, createYAxisLine } from './axis-lines.js';

export default function createAxes(data, chart, options) {
  const nonAxialCharts = ['voronoi', 'treeMap', 'treeDiagram', 'radialTree', 'icicle', 'polar', 'radar', 'pie', 'donut', 'heatmap', 'bubble', 'sun', 'chord', 'cloud', 'cluster', 'dendrogram', 'sankey'];

  if (nonAxialCharts.includes(chart)) {
    return {};
  }

  if (chart === 'adjacency') {
    data = convertToAdjacencyList(data);
  }
  const {
    margin, width, height, yDomain,
  } = options;

  const chartFunctions = {
    adjacency: (data) => createAdjacency(data, options),
    bar: (data) => createBarBox(data, options),
    box: (data) => createBarBox(data, options),
    funnel: (data) => createFunnel(data, options),
    heat: (data) => createHeat(data, options),
    marimekko: (data) => createMarimekko(data, options),
    waterfall: (data) => createWaterfall(data, options),
    stackedBar: (data) => createStackedBar(data, options),
    default: (data) => createDefault(data, options),
  };

  const scaleFunctions = {
    adjacency: () => d3.scaleBand()
      .domain(data.nodes.map((d) => d.id))
      .range([options.margin.top, options.height - options.margin.bottom])
      .padding(0.1),
    bar: () => d3.scaleLinear()
      .domain(yDomain || [0, d3.max(data, (d) => d.y)]).nice()
      .range([height - margin.bottom, margin.top]),
    funnel: () => d3.scaleBand()
      .domain(yDomain || data.map((d) => d.x))
      .range([margin.top, height - margin.bottom])
      .padding(0.1),
    marimekko: () => d3.scaleLinear()
      .domain([0, 1])
      .range([options.height - options.margin.top - options.margin.bottom, 0]),
    heat: () => d3.scaleBand()
      .domain(data.map((d) => d.y1))
      .range([margin.top, height - margin.bottom])
      .padding(0.25),
    stackedBar: () => d3.scaleLinear()
      .domain(yDomain || [0, d3.max(data, (d) => d3.sum(d.children.map((v) => v.value)))])
      .nice()
      .range([height - margin.bottom, margin.top]),
    waterfall: () => d3.scaleLinear()
      .domain(yDomain || [d3.min(data, (d) => d.y1), d3.max(data, (d) => d.y2)])
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
    if (g.node()) {
      xAxisBBox = g.node().getBBox();
    } else {
      console.error('Node is null');
    }
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
  console.log(x, y, '[]');
  return {
    x, y, xAxis, yAxis, xAxisBBox, yAxisBBox,
  };
}

function createAdjacency(data, options) {
  return d3.scaleBand()
    .domain(data.nodes.map((d) => d.id))
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}

function createBarBox(data, options) {
  const isXValueNumeric = typeof data[0].x === 'number';

  if (isXValueNumeric) {
    return d3.scaleLinear()
      .domain(options.xDomain ? options.xDomain : d3.extent(data, (d) => d.x)).nice()
      .range([options.margin.left, options.width - options.margin.right]);
  }
  console.log(isXValueNumeric);
  data.sort((a, b) => d3.ascending(a.x, b.x));
  return d3.scaleBand()
    .domain(options.xDomain ? options.xDomain : data.map((d) => d.x))
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}

function createFunnel(data, options) {
  const totalValue = data.reduce((acc, curr) => acc + curr.y, 0);
  return d3.scaleLinear()
    .domain(options.xDomain ? options.xDomain : [0, totalValue])
    .range([options.margin.left, options.width - options.margin.right]);
}
function createMarimekko(data, options) {
  return d3.scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, options.width - options.margin.left - options.margin.right])
    .padding(0.1);
}
function createHeat(data, options) {
  return d3.scaleBand()
    .domain(data.map((d) => d.x))
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.25);
}

function createStackedBar(data, options) {
  return d3.scaleBand()
    .domain(options.xDomain ? options.xDomain : data.map((d) => d.name))
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}
// function createWaterfall(data, options) {
//   const isXValueNumeric = typeof data[0].x === 'number';

//   if (isXValueNumeric) {
//     return d3.scaleLinear()
//       .domain(options.xDomain ? options.xDomain : d3.extent(data, (d) => d.category)).nice()
//       .range([options.margin.left, options.width - options.margin.right]);
//   }
//   return d3.scaleBand()
//     .domain(options.xDomain ? options.xDomain : [data[0].category, ...data.map((d) => d.category), data[data.length - 1].category])
//     .range([options.margin.left, options.width - options.margin.right])
//     .padding(0.1);
// }
function createWaterfall(data, options) {
  const isXValueNumeric = typeof data[0].x === 'number';

  if (isXValueNumeric) {
    return d3.scaleLinear()
      .domain(options.xDomain ? options.xDomain : d3.extent(data, (d) => d.x)).nice()
      .range([options.margin.left, options.width - options.margin.right]);
  }
  return d3.scaleBand()
    .domain(options.xDomain ? options.xDomain : [data[0].x, ...data.map((d) => d.x), data[data.length - 1].x])
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}

// function createStackedBar(data, options) {
//   if (isXValueNumeric) {
//     return d3.scaleLinear()
//       .domain(options.xDomain ? options.xDomain : d3.extent(data, (d) => d.name)).nice()
//       .range([options.margin.left, options.width - options.margin.right]);
//   }
//   return d3.scaleBand()
//     .domain(options.xDomain ? options.xDomain : data.map((d) => d.name))
//     .range([options.margin.left, options.width - options.margin.right])
//     .padding(0.1);
// }

function createDefault(data, options) {
  const isXValueNumeric = typeof data[0].x === 'number';

  if (isXValueNumeric) {
    return d3.scaleLinear()
      .domain(d3.extent(data, (d) => d.x)).nice()
      .range([options.margin.left, options.width - options.margin.right]);
  }
  console.log(isXValueNumeric);
  return d3.scaleBand()
    .domain(data.map((d) => d.x))
    .range([options.margin.left, options.width - options.margin.right])
    .padding(0.1);
}
// function convertToAdjacencyList(chordData) {
//   const nodes = chordData.map((d) => ({ id: d.category }));
//   const links = [];

//   chordData.forEach((d) => {
//     d.children.forEach((child) => {
//       links.push({
//         source: d.category,
//         target: child.name,
//         value: child.value,
//       });
//     });
//   });

//   return { nodes, links };
// }
// function convertToAdjacencyList(rootChordData) {
//   console.log('convertToAdjacencyList', rootChordData);

//   const nodes = rootChordData.children.map((d) => ({ id: d.name }));
//   const links = [];

//   rootChordData.children.forEach((d) => {
//     d.children.forEach((child) => {
//       links.push({
//         source: d.name,
//         target: child.name,
//         value: child.value,
//       });
//     });
//   });

//   return { nodes, links };
// }
function convertToAdjacencyList(data) {
  console.log('convertToAdjacencyList', data);

  let nodes = [];
  let links = [];

  data.forEach((d) => {
    // Include the parent node in the node list
    nodes.push({ id: d.name });

    // Include the children nodes in the node list
    nodes = nodes.concat(d.children.map((child) => ({ id: child.name })));

    // For each child, create a link from the parent node to the child node
    links = links.concat(
      d.children.map((child) => ({
        source: d.name,
        target: child.name,
        value: child.value,
      }))
    );
  });

  return { nodes, links };
}
