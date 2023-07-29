// import { isDataInCorrectFormat } from '../../functions/format-data';

// export default function createRadialTree(data, options, chartComponents) {
//   const { svg } = chartComponents;
//   // Convert the data array into a root node object
//   let rootData;
//   if (isDataInCorrectFormat(data)) {
//     rootData = data;
//   } else {
//     rootData = {
//       name: 'root',
//       children: data,
//     };
//   }
//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.width / 2}, ${options.height / 2})`);

//   const layout = d3.tree()
//     .size([`${2 * Math.PI + options.angle}`, options.radius]);

//   const root = d3.hierarchy(rootData);
//   layout(root);

//   const linkGenerator = d3.linkRadial()
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
//     .style('fill', options.fillColor ? `${options.fillColor}` : 'none');

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
//     .attr('transform', (d) => {
//       const angle = (d.x * 180) / Math.PI;
//       const rotation = angle < 180 ? angle - 90 : angle + 90;
//       return `rotate(${rotation})`;
//     })
//     .text((d) => d.data.name)
//     .style('font-size', options.childTextSize)
//     .style('font-family', options.fontFamily)
//     .style('font-weight', options.fontWeight)
//     .style('fill', options.fontColor);

//   function radialPoint(x, y) {
//     return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
//   }
// }
import { isDataInCorrectFormat } from '../../functions/format-data';

export default function createRadialTree(data, options, chartComponents) {
  const {
    width,
    height,
    angle,
    radius,
    linkColor,
    fillColor,
    nodeRadius,
    nodeColor,
    childTextSize,
    fontFamily,
    fontWeight,
    fontColor,
  } = options;
  const { svg } = chartComponents;

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
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const layout = d3.tree()
    .size([`${2 * Math.PI + angle}`, radius]);

  const root = d3.hierarchy(rootData);
  layout(root);

  const linkGenerator = d3.linkRadial()
    .angle((d) => d.x)
    .radius((d) => d.y);

  const link = g
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', linkGenerator)
    .style('stroke', linkColor)
    .style('fill', fillColor ? `${fillColor}` : 'none');

  const node = g
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', (d) => `node${d.children ? ' node--internal' : ' node--leaf'}`)
    .attr('transform', (d) => `translate(${radialPoint(d.x, d.y)})`);

  node
    .append('circle')
    .attr('r', nodeRadius)
    .style('fill', nodeColor);

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
    .style('font-size', childTextSize)
    .style('font-family', fontFamily)
    .style('font-weight', fontWeight)
    .style('fill', fontColor);

  function radialPoint(x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  }
}
