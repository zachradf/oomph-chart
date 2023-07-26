import { isDataInCorrectFormat } from '../../functions/format-data';

export default function createTreeDiagram(data, options, chartComponents) {
  const {
    width,
    height,
    color,
    radius,
    strokeColor,
  } = options;
  const { svg } = chartComponents;
  console.log('in treeD', data);
  let rootData;
  if (isDataInCorrectFormat(data)) {
    rootData = data;
  } else {
    rootData = {
      name: 'root',
      children: data,
    };
  }

  const topPadding = options.margin.top + radius; // Adjust the padding here based on your requirements
  const sidePadding = options.margin.left + radius; // Adjust the padding here based on your requirements

  const tree = d3.tree().size([height - 2 * topPadding, width - 2 * sidePadding]);
  const root = d3.hierarchy(rootData); // Use processData here

  tree(root);
  // Create a group (g) element and translate it down by padding
  const g = svg.append('g')
    .attr('transform', `translate(${sidePadding}, ${topPadding})`);

  // Create links (use g instead of svg)
  const link = g.selectAll('.link')
    .data(root.links())
    .join('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', strokeColor)
    .attr('stroke-width', `${options.strokeWidth}` || 1.5)
    .attr('stroke-opacity', options.opacity)
    .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));

  // Create nodes (use g instead of svg)
  const node = g.selectAll('.node')
    .data(root.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y}, ${d.x})`);

  node
    .append('circle')
    .attr('r', radius)
    .style('fill', color);

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', (d) => (d.children ? -radius : radius))
    .text((d) => d.data.name)
    .style('font-size', `${options.childTextSize}`)
    .style('fill', `${options.fontColor}`);
}
