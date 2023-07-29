// export default function createDendrogram(data, options, chartComponents) {
//   const { svg } = chartComponents;

//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

//   const layout = d3.cluster()
//     .size([options.height - options.margin.top - options.margin.bottom, options.width - options.margin.left - options.margin.right]);

//   const root = d3.hierarchy(data);
//   layout(root);

//   const link = g
//     .selectAll('.link')
//     .data(root.descendants().slice(1))
//     .enter()
//     .append('path')
//     .attr('class', 'link')
//     .attr('d', (d) => `M${d.y},${d.x}V${(d.x + d.parent.x) / 2}H${d.parent.y}V${d.parent.x}`)
//     .style('stroke', options.linkColor)
//     .style('fill', 'none');

//   const node = g
//     .selectAll('.node')
//     .data(root.descendants())
//     .enter()
//     .append('g')
//     .attr('class', (d) => `node${d.children ? ' node--internal' : ' node--leaf'}`)
//     .attr('transform', (d) => `translate(${d.y},${d.x})`);

//   node
//     .append('circle')
//     .attr('r', options.nodeRadius)
//     .style('fill', options.nodeColor);

//   node
//     .append('text')
//     .attr('dy', '.35em')
//     .attr('x', (d) => (d.children ? -options.nodeRadius - 2 : options.nodeRadius + 2))
//     .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
//     .text((d) => d.data.name)
//     .style('font-size', options.childTextSize)
//     .style('fill', options.fontColor);
// }
import { isDataInCorrectFormat } from '../../functions/format-data';

export default function createDendrogram(data, options, chartComponents) {
  const { svg } = chartComponents;
  const {
    margin, height, width, linkColor, nodeRadius, nodeColor, childTextSize, fontColor,
  } = options;

  // Convert the data array into a root node object
  let rootData;
  if (isDataInCorrectFormat(data)) {
    rootData = data;
  } else {
    rootData = {
      name: 'root',
      children: data,
    };
  }

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const layout = d3.cluster()
    .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

  // const root = d3.hierarchy(data, (d) => d.children);
  const root = d3.hierarchy(rootData, (d) => d.children).sum((d) => d.value);

  layout(root);

  const link = g
    .selectAll('.link')
    .data(root.descendants().slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', (d) => `M${d.y},${d.x}V${(d.x + d.parent.x) / 2}H${d.parent.y}V${d.parent.x}`)
    .style('stroke', linkColor)
    .style('fill', 'none');

  const node = g
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', (d) => `node${d.children ? ' node--internal' : ' node--leaf'}`)
    .attr('transform', (d) => `translate(${d.y},${d.x})`);

  node
    .append('circle')
    .attr('r', nodeRadius)
    .style('fill', nodeColor);

  node
    .append('text')
    .attr('dy', '.35em')
    .attr('x', (d) => (d.children ? -nodeRadius - 2 : nodeRadius + 2))
    .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => d.data.name)
    .style('font-size', childTextSize)
    .style('fill', fontColor);
}
