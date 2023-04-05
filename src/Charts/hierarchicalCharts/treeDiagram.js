export default function createTreeDiagram(data, selector, options) {
  // Set default options if not provided
  // TODO Refactor this to use the default options/be consistent with other charts
  const {
    width,
    height,
    nodeColor,
    nodeRadius,
    linkColor,
  } = options;

  // Create the SVG container for the tree diagram
  const svg = d3
    .select(selector)
    .append('svg')
    .classed('tree-diagram', true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${nodeRadius})`);

  // Initialize the tree layout with the size set to the provided options
  const tree = d3.tree().size([height - 2 * nodeRadius, (width - 2 * nodeRadius) / 2]);

  // TODO replace treemap with a partition function you can generalize for sunburst and tree map

  // Create the hierarchy from the data using d3.hierarchy
  // This assigns additional properties like depth, height, and parent to each node
  const root = d3.hierarchy(data);

  // Compute the layout using the tree layout
  tree(root);

  // Draw links between the nodes
  // 1. Select all elements with class 'link'
  // 2. Bind the data (root.links() returns an array of links) to the selection
  // 3. Add a 'path' element for each link in the data
  // 4. Set the attributes and styles for the link paths
  const link = svg
    .selectAll('.link')
    .data(root.links())
    .join('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', linkColor)
    .attr('stroke-width', 1.5)
    .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));

  // Draw nodes (represented as circles)
  // 1. Select all elements with class 'node'
  // 2. Bind the data (root.descendants() returns an array of nodes) to the selection
  // 3. Add a 'g' element (group) for each node in the data
  // 4. Set the attributes and styles for the node groups
  const node = svg
    .selectAll('.node')
    .data(root.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y}, ${d.x})`);

  // Add node circles to the node groups
  // 1. Append a 'circle' element to each node group
  // 2. Set the radius attribute based on the provided options
  // 3. Set the fill style based on the provided options
  node
    .append('circle')
    .attr('r', nodeRadius)
    .style('fill', nodeColor);

  // Add node labels (text) to the node groups
  // 1. Append a 'text' element to each node group
  // 2. Set the attributes and styles for the text elements
  // 3. Set the displayed text based on the name property of the data
  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', (d) => (d.children ? -nodeRadius : nodeRadius))
    .text((d) => d.data.name)
    .style('font-size', '10px')
    .style('fill', '#333');
}
