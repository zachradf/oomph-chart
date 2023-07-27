import { voronoiTreemap } from 'd3-voronoi-treemap';
import { isDataInCorrectFormat, hasValues } from '../../functions/format-data';

export default function createVoronoiTreemap(data, options, chartComponents) {
  let rootData;

  if (!hasValues(data)) {
    console.error(`An ${options.chartClass} diagram requires numeric child values`);
    return;
  }
  if (isDataInCorrectFormat(data)) {
    rootData = data;
  } else {
    rootData = {
      name: 'root',
      children: data,
    };
  }
  const { svg } = chartComponents;

  const layout = voronoiTreemap().size([options.width, options.height]);

  const root = d3.hierarchy(rootData).sum((d) => d.value);
  layout(root);

  const cells = root.descendants().filter((d) => d.depth);

  const categoryColor = d3.scaleOrdinal()
    .domain(d3.range(options.colorScheme.length))
    .range(options.colorScheme);

  const groups = svg
    .selectAll('g')
    .data(cells)
    .enter()
    .append('g')
    .attr('fill', (d) => {
      if (d.depth === 1) {
        return categoryColor(d.data.name);
      } if (d.depth > 1) {
        const parentCategory = d.parent.data.name;
        const parentColor = categoryColor(parentCategory);
        const interpolator = d3.interpolateRgbBasis([parentColor, 'white']);
        return interpolator(d.data.value / d.parent.value);
      }
    })
    .attr('font-size', `${options.parentTextSize}`)
    .attr('stroke', `${options.strokeColor}`);

  groups
    .append('path')
    .attr('d', (d) => d3.line().curve(d3.curveLinearClosed)(d.polygon))
    .attr('opacity', 0.8)
    .attr('stroke-width', `${options.strokeWidth}` || 1);

  groups
    .append('text')
    .attr('x', (d) => d3.polygonCentroid(d.polygon)[0])
    .attr('y', (d) => d3.polygonCentroid(d.polygon)[1])
    .attr('text-anchor', `${options.textAnchor}}`)
    .attr('dy', '.35em')
    .text((d) => d.data.name)
    .style('font-size', (d) => (d.depth === 1 ? `${options.parentTextSize}` : `${options.childTextSize}`))
    .style('fill', 'black');
}
// import { voronoiTreemap } from 'd3-voronoi-treemap';

// export default function createVoronoiTreemap(data, options, chartComponents) {
//   const { svg } = chartComponents;

//   const layout = voronoiTreemap().size([options.width, options.height]);

//   const root = d3.hierarchy(data).sum((d) => d.value);
//   layout(root);

//   const cells = root.descendants().filter((d) => d.depth);

//   const categoryColor = d3.scaleOrdinal()
//     .domain(d3.range(options.colorScheme.length))
//     .range(options.colorScheme);

//   const groups = svg
//     .selectAll('g')
//     .data(cells)
//     .enter()
//     .append('g')
//     .attr('fill', (d) => {
//       if (d.depth === 1) {
//         return categoryColor(d.data.category);
//       } if (d.depth === 2) {
//         const parentCategory = d.parent.data.category;
//         const parentColor = categoryColor(parentCategory);
//         const interpolator = d3.interpolateRgbBasis([parentColor, 'white']);
//         return interpolator(d.data.value / d.parent.value);
//       }
//     })
//     .attr('stroke', `${options.strokeColor}`)
//     .attr('font-size', `${options.parentTextSize}`);

//   groups
//     .append('path')
//     .attr('d', (d) => d3.line().curve(d3.curveLinearClosed)(d.polygon))
//     .attr('opacity', 0.8)
//     .attr('stroke-width', `${options.strokeWidth}` || 1);

//   groups
//     .append('text')
//     .attr('x', (d) => d3.polygonCentroid(d.polygon)[0])
//     .attr('y', (d) => d3.polygonCentroid(d.polygon)[1])
//     .attr('text-anchor', `${options.textAnchor}}`)
//     .attr('dy', '.35em')
//     .text((d) => (d.depth === 1 ? d.data.category : d.data.name))
//     .style('font-size', `${options.childTextSize}`)
//     .style('fill', 'white');
// }
