// export default function createClusterDiagram(data, options, chartComponents) {
//   const {
//     width,
//     height,
//     color = d3.scaleOrdinal(d3.schemeCategory10),
//     nodeRadius,
//     strokeColor,
//   } = options;
//   const { svg } = chartComponents;

//   const cluster = d3.cluster().size([360, height / 2 - 100]);

//   const root = d3.hierarchy(data);

//   cluster(root);

//   const link = svg
//     .selectAll('.link')
//     .data(root.links())
//     .join('line')
//     .attr('class', 'link')
//     .attr('stroke', strokeColor)
//     .attr('stroke-width', `${options.strokeWidth}` || 1.5)
//     .attr('x1', (d) => d.source.y * Math.cos((d.source.x - 90) * Math.PI / 180))
//     .attr('y1', (d) => d.source.y * Math.sin((d.source.x - 90) * Math.PI / 180))
//     .attr('x2', (d) => d.target.y * Math.cos((d.target.x - 90) * Math.PI / 180))
//     .attr('y2', (d) => d.target.y * Math.sin((d.target.x - 90) * Math.PI / 180));

//   const node = svg
//     .selectAll('.node')
//     .data(root.descendants())
//     .join('g')
//     .attr('class', 'node')
//     .attr('transform', (d) => `translate(${d.y * Math.cos((d.x - 90) * Math.PI / 180)}, ${d.y * Math.sin((d.x - 90) * Math.PI / 180)})`);

//   node
//     .append('circle')
//     .attr('r', nodeRadius)
//     .style('fill', (d) => color(d.data.group));

//   node
//     .append('text')
//     .attr('dy', '0.31em')
//     .attr('x', (d) => (d.children ? -nodeRadius : nodeRadius))
//     .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
//     .style('font-size', `${options.childTextSize}`)
//     .style('fill', '#000')
//     .text((d) => d.data.name);
// }
// export default function createClusterDiagram(data, options, chartComponents) {
//   const {
//     width,
//     height,
//     colorScheme = d3.schemeCategory10,
//     nodeRadius,
//     strokeColor,
//   } = options;
//   const { svg } = chartComponents;
//   const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
//   const color = d3.scaleOrdinal(colorScheme);
//   const cluster = d3.cluster().size([360, height / 2 - 100]);

//   const root = d3.hierarchy(data, (d) => d.children);

//   cluster(root);

//   const link = g
//     .selectAll('.link')
//     .data(root.links())
//     .join('line')
//     .attr('class', 'link')
//     .attr('stroke', strokeColor)
//     .attr('stroke-width', `${options.strokeWidth}` || 1.5)
//     .attr('x1', (d) => d.source.y * Math.cos((d.source.x - 90) * Math.PI / 180))
//     .attr('y1', (d) => d.source.y * Math.sin((d.source.x - 90) * Math.PI / 180))
//     .attr('x2', (d) => d.target.y * Math.cos((d.target.x - 90) * Math.PI / 180))
//     .attr('y2', (d) => d.target.y * Math.sin((d.target.x - 90) * Math.PI / 180));

//   const node = g
//     .selectAll('.node')
//     .data(root.descendants())
//     .join('g')
//     .attr('class', 'node')
//     .attr('transform', (d) => `translate(${d.y * Math.cos((d.x - 90) * Math.PI / 180)}, ${d.y * Math.sin((d.x - 90) * Math.PI / 180)})`);

//   node
//     .append('circle')
//     .attr('r', nodeRadius)
//     .style('fill', (d) => (d.data.name ? color(d.data.value) : 'black'));

//   node
//     .append('text')
//     .attr('dy', '0.31em')
//     .attr('x', (d) => (d.children ? -nodeRadius : nodeRadius))
//     .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
//     .style('font-size', `${options.childTextSize}`)
//     .style('fill', 'black')
//     .text((d) => d.data.category || d.data.name);
// }
export default function createClusterDiagram(data, options, chartComponents) {
  const {
    width,
    height,
    colorScheme = d3.schemeCategory10,
    nodeRadius,
    strokeColor,
  } = options;
  const { svg } = chartComponents;
  const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
  const color = d3.scaleOrdinal(colorScheme);
  const cluster = d3.cluster().size([2 * Math.PI, height / 2 - 100]); // Angles are now in radians

  const root = d3.hierarchy(data, (d) => d.children);

  cluster(root);

  const link = g
    .selectAll('.link')
    .data(root.links())
    .join('line')
    .attr('class', 'link')
    .attr('stroke', strokeColor)
    .attr('stroke-width', `${options.strokeWidth}` || 1.5)
    .attr('x1', (d) => d.source.y * Math.cos(d.source.x))
    .attr('y1', (d) => d.source.y * Math.sin(d.source.x))
    .attr('x2', (d) => d.target.y * Math.cos(d.target.x))
    .attr('y2', (d) => d.target.y * Math.sin(d.target.x));

  const node = g
    .selectAll('.node')
    .data(root.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y * Math.cos(d.x)}, ${d.y * Math.sin(d.x)})`);

  node
    .append('circle')
    .attr('r', nodeRadius)
    .style('fill', (d) => (d.data.name ? color(d.data.value) : 'black'));

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', (d) => (d.children ? -nodeRadius : nodeRadius))
    .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .style('font-size', `${options.childTextSize}`)
    .style('fill', 'black')
    .text((d) => d.data.name);
}
