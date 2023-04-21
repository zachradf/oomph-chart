export default function generalElementsFunction(data, graph, options) {
  let x;

  switch (graph) {
    case 'BAR':
    case 'BOX':
      x = d3.scaleBand()
        .domain(data.map((d) => d.x))
        .range([options.margin.left, options.width - options.margin.right])
        .padding(0.1);
      break;
    case 'FUNNEL':
      const totalValue = data.reduce((acc, curr) => acc + curr.y, 0);
      x = d3
        .scaleLinear()
        .domain([0, totalValue])
        .range([options.margin.left, options.width - options.margin.right]);
      break;
    case 'WATERFALL':
      x = d3.scaleBand()
        .domain([data[0].category, ...data.map((d) => d.category), data[data.length - 1].category])
        .range([options.margin.left, options.width - options.margin.right])
        .padding(0.1);
      break;
    case 'STACKEDBAR':
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
    BAR: () => d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)]).nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
    FUNNEL: () => d3.scaleBand()
      .domain(data.map((d) => d.x))
      .range([options.margin.top, options.height - options.margin.bottom])
      .padding(0.1),
    STACKEDBAR: () => d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d3.sum(d.values.map((v) => v.value)))])
      .nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
    WATERFALL: () => d3.scaleLinear()
      .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
      .nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
    default: () => d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)]).nice()
      .range([options.height - options.margin.bottom, options.margin.top]),
  };

  const y = (scaleFunctions[graph] || scaleFunctions.default)();

  // Define the x-axis function with a bottom orientation and custom ticks
  const xAxis = (g) => g
    .attr('transform', `translate(0,${options.height - options.margin.bottom})`)
    .call(d3.axisBottom(x).ticks(options.width / 80).tickSizeOuter(0));

  let yAxis;
  switch (graph) {
    case 'WATERFALL':
      yAxis = (g) => g
        .attr('transform', `translate(${options.margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.selectAll('.tick line').clone()
          .attr('x2', options.width - options.margin.left - options.margin.right)
          .attr('stroke-opacity', 0.1));
      break;
    case 'STACKEDBAR':
      yAxis = (g) => g
        .attr('transform', `translate(${options.margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .call((g) => g.select('.domain').remove());
      break;
    case 'BAR':
      yAxis = (g) => g
        .attr('transform', `translate(${options.margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select('.domain').remove());
      break;
    default:
      yAxis = (g) => g
        .attr('transform', `translate(${options.margin.left},0)`)
        .call(d3.axisLeft(y).ticks(options.height / 80))
        .call((g) => g.select('.domain').remove());
      break;
  }

  return {
    x, y, xAxis, yAxis,
  };
}

// TODO replace domains with the ability to have negative values:
// .domain(d3.extent(data, (d) => d.x)).nice()
