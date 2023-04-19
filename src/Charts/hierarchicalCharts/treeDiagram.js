export default function createTreeDiagram(data, selector, options) {
  const {
    width,
    height,
    color,
    radius,
    strokeColor,
  } = options;

  const svg = d3
    .select(selector)
    .append('svg')
    .classed('tree-diagram', true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${radius}, ${radius})`); // Adjust translation here

  const tree = d3.tree().size([height, width]); // Adjust size here

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
