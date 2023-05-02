export default function createTreeDiagram(data, options, generalElements) {
  const {
    width,
    height,
    color,
    radius,
    strokeColor,
  } = options;
  const { svg } = generalElements;

  const tree = d3.tree().size([height - 10, width - 10]); // Adjust size here

  const root = d3.hierarchy(data);

  tree(root);

  const link = svg
    .selectAll('.link')
    .data(root.links())
    .join('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', strokeColor)
    .attr('stroke-width', 1.5)
    .attr('stroke-opacity', options.opacity)
    .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));

  const node = svg
    .selectAll('.node')
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
    .style('fill', '#000');
}
