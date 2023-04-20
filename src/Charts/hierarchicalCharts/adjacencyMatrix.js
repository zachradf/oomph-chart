// import { scaleBand, select } from 'd3';

// export default function createAdjacencyMatrix(data, selector, options) {
//   const svg = select(selector)
//     .append('svg')
//     .classed('adjacency-matrix', true)
//     .attr('width', options.width)
//     .attr('height', options.height);

//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

//   const x = scaleBand()
//     .domain(data.nodes.map((d) => d.id))
//     .range([0, options.width - options.margin.left - options.margin.right])
//     .padding(0.1);

//   const y = scaleBand()
//     .domain(data.nodes.map((d) => d.id))
//     .range([0, options.height - options.margin.top - options.margin.bottom])
//     .padding(0.1);

//   const colorScale = d3.scaleLinear()
//     .domain([0, d3.max(data.links.map((d) => d.value))])
//     .range([options.minColor, options.maxColor]);

//   g.selectAll('rect')
//     .data(data.links)
//     .enter()
//     .append('rect')
//     .attr('x', (d) => x(d.source))
//     .attr('y', (d) => y(d.target))
//     .attr('width', x.bandwidth())
//     .attr('height', y.bandwidth())
//     .attr('fill', (d) => colorScale(d.value));
// }
import { scaleBand, select, axisBottom, axisLeft } from 'd3';

export default function createAdjacencyMatrix(data, selector, options) {
  const svg = select(selector)
    .append('svg')
    .classed('adjacency-matrix', true)
    .attr('width', options.width)
    .attr('height', options.height);

  const g = svg
    .append('g')
    .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

  const x = scaleBand()
    .domain(data.nodes.map((d) => d.id))
    .range([0, options.width - options.margin.left - options.margin.right])
    .padding(0.1);

  const y = scaleBand()
    .domain(data.nodes.map((d) => d.id))
    .range([0, options.height - options.margin.top - options.margin.bottom])
    .padding(0.1);

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.links.map((d) => d.value))])
    .range([options.minColor, options.maxColor]);

  g.selectAll('rect')
    .data(data.links)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.source))
    .attr('y', (d) => y(d.target))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('fill', (d) => colorScale(d.value));

  // Add x-axis
  const xAxis = axisBottom(x);
  g.append('g')
    .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
    .call(xAxis);

  // Add y-axis
  const yAxis = axisLeft(y);
  g.append('g')
    .call(yAxis);
}

// Sample dataset and usage are the same as before.
