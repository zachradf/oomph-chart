// import {
//   tree, hierarchy, select, linkRadial
// } from 'd3';

// export default function createRadialTree(data, selector, options) {
//   const svg = select(selector)
//     .append('svg')
//     .classed('radial-tree', true)
//     .attr('width', options.width)
//     .attr('height', options.height);

//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);

//   const layout = tree()
//     .size([2 * Math.PI, options.radius]);

//   const root = hierarchy(data);
//   layout(root);

//   const linkGenerator = linkRadial()
//     .angle((d) => d.x)
//     .radius((d) => d.y);

//   const link = g
//     .selectAll('.link')
//     .data(root.links())
//     .enter()
//     .append('path')
//     .attr('class', 'link')
//     .attr('d', linkGenerator)
//     .style('stroke', options.linkColor)
//     .style('fill', 'none');

//   const node = g
//     .selectAll('.node')
//     .data(root.descendants())
//     .enter()
//     .append('g')
//     .attr('class', (d) => `node${d.children ? ' node--internal' : ' node--leaf'}`)
//     .attr('transform', (d) => `translate(${radialPoint(d.x, d.y)})`);

//   node
//     .append('circle')
//     .attr('r', options.nodeRadius)
//     .style('fill', options.nodeColor);

//   node
//     .append('text')
//     .attr('dy', '.31em')
//     .attr('x', (d) => (d.x < Math.PI === !d.children ? 6 : -6))
//     .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
//     .attr('transform', (d) => `rotate(${((d.x * 180) / Math.PI) - 90})`)
//     .text((d) => d.data.name)
//     .style('font-size', options.childTextSize)
//     .style('fill', options.textColor);

//   function radialPoint(x, y) {
//     return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
//   }
// }
import {
  tree, hierarchy, select, linkRadial
} from 'd3';

export default function createRadialTree(data, selector, options) {
  const svg = select(selector)
    .append('svg')
    .classed('radial-tree', true)
    .attr('width', options.width)
    .attr('height', options.height);

  const g = svg
    .append('g')
    .attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);

  const layout = tree()
    .size([2 * Math.PI, options.radius]);

  const root = hierarchy(data);
  layout(root);

  const linkGenerator = linkRadial()
    .angle((d) => d.x)
    .radius((d) => d.y);

  const link = g
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', linkGenerator)
    .style('stroke', options.linkColor)
    .style('fill', 'none');

  const node = g
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', (d) => `node${d.children ? ' node--internal' : ' node--leaf'}`)
    .attr('transform', (d) => `translate(${radialPoint(d.x, d.y)})`);

  node
    .append('circle')
    .attr('r', options.nodeRadius)
    .style('fill', options.nodeColor);

  node
    .append('text')
    .attr('dy', '.31em')
    .attr('x', (d) => (d.x < Math.PI === !d.children ? 6 : -6))
    .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
    .attr('transform', (d) => {
      const angle = (d.x * 180) / Math.PI;
      const rotation = angle < 180 ? angle - 90 : angle + 90;
      return `rotate(${rotation})`;
    })
    .text((d) => d.data.name)
    .style('font-size', options.childTextSize)
    .style('fill', options.textColor);

  function radialPoint(x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  }
}
