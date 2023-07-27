// export default function createD3StackedBarChart(data, options, chartComponents) {
//   const {
//     x, y, svg,
//   } = chartComponents;

//   // Create a color scale using the color scheme provided
//   const color = d3.scaleOrdinal()
//     .domain(data[0].values.map((v) => v.group))
//     .range(options.color);

//   // Create a stack generator to transform the data into stacked form
//   const stack = d3.stack()
//     .keys(data[0].values.map((v) => v.group))
//     .value((d, key) => (d.find((v) => v.group === key)).value);

//   // Append a group element for the bars
//   const bars = svg.append('g')
//     .selectAll('g')
//     .data(stack(data.map((d) => d.values)))
//     .join('g')
//     .attr('fill', (d) => color(d.key));

//   // Append a rectangle for each data point in the stack
//   bars.selectAll('rect')
//     .data((d) => d)
//     .join('rect')
//     .attr('x', (d, i) => x(data[i].category))
//     .attr('y', (d) => y(d[1]))
//     .attr('height', (d) => y(d[0]) - y(d[1]))
//     .attr('width', x.bandwidth());
// }
import { hasValues } from "../../functions/format-data";

export default function createD3StackedBarChart(data, options, chartComponents) {
  if (!hasValues(data)) {
    console.error(`A ${options.chartClass} diagram requires numeric child values`);
  }
  validateStackedBar(data)

  const {
    x, y, svg,
  } = chartComponents;
  // Create a color scale using the color scheme provided
  // const color = d3.scaleOrdinal()
  //   .domain(data[0].children.map((v) => v.name))
  //   .range(options.color);
  const color = d3.scaleOrdinal()
    .domain(data[0].children.map((v) => v.name))
    .range(options.colorScheme || d3.schemeCategory10); // This is an array of 10 colors

  // Create a stack generator to transform the data into stacked form
  const stack = d3.stack()
    .keys(data[0].children.map((v) => v.name))
    .value((d, key) => (d.find((v) => v.name === key)).value);

  // Append a group element for the bars
  const bars = svg.append('g')
    .selectAll('g')
    .data(stack(data.map((d) => d.children)))
    .join('g')
    .attr('fill', (d) => color(d.key));

  // Append a rectangle for each data point in the stack
  bars.selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d, i) => x(data[i].name))
    .attr('y', (d) => y(d[1]))
    .attr('height', (d) => y(d[0]) - y(d[1]))
    .attr('width', x.bandwidth());
}

function validateStackedBar(data) {
  const childrenNames = data[0]?.children?.map(child => child.name);
  for (const item of data) {
  // Check if children names are consistent across all data objects
  const currentChildrenNames = item.children.map((child) => child.name);
  if (!arraysEqual(childrenNames, currentChildrenNames)) {
    throw new Error('All children arrays must have identical "name" values across all objects for a stackedBar.');
    }
  }
}
// Helper function to check if two arrays are equal
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
