// export default function createD3TreeMap(data, options, chartComponents) {
//   // Set default options
//   const width = options.width || 600;
//   const height = options.height || 400;
//   const color = d3.scaleOrdinal()
//     .domain(d3.range(options.colorScheme.length))
//     .range(options.colorScheme);
//   const { svg } = chartComponents;

//   // Create the treemap layout
//   const treemap = d3.treemap()
//     .size([width, height])
//     .padding(1)
//     .round(true);

//   // Process the data
//   const root = d3.hierarchy(data)
//     .sum((d) => d.value)
//     .sort((a, b) => b.value - a.value);

//   treemap(root);

//   // Draw the treemap
//   const leaf = svg.selectAll('g')
//     .data(root.leaves())
//     .join('g')
//     .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

//   leaf.append('rect')
//     .attr('width', (d) => d.x1 - d.x0)
//     .attr('height', (d) => d.y1 - d.y0)
//     .attr('fill', (d) => color(d.parent.data.name));

//   leaf.append('text')
//     .attr('x', 3)
//     .attr('y', 12)
//     .text((d) => d.data.name)
//     .style('font-size', `${options.childTextSize}`);
// }
import { isDataInCorrectFormat } from '../../functions/format-data';

export default function createD3TreeMap(data, options, chartComponents) {
  // Convert the data array into a root node object only if necessary
  let rootData;
  if (isDataInCorrectFormat(data)) {
    rootData = data;
  } else {
    rootData = {
      name: 'root',
      children: data,
    };
  }

  // Set default options
  const width = options.width || 600;
  const height = options.height || 400;
  const color = d3.scaleOrdinal()
    .domain(d3.range(options.colorScheme.length))
    .range(options.colorScheme);
  const { svg } = chartComponents;

  // Create the treemap layout
  const treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

  // Process the data
  const root = d3.hierarchy(rootData, (d) => d.children)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  // Check if the sum of the data is 0
  if (root.value === 0) {
    throw new Error('The sum of the data is 0. Please provide data with non-zero values.');
  }

  treemap(root);

  // Draw the treemap
  const leaf = svg.selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  leaf.append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', (d) => color(d.parent.data.name));

  leaf.append('text')
    .attr('x', 3)
    .attr('y', 12)
    .text((d) => d.data.name)
    .style('font-size', `${options.childTextSize}`);
}
