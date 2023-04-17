import { voronoiTreemap } from 'd3-voronoi-treemap';
import { scaleOrdinal, schemeCategory10, interpolateRgbBasis } from 'd3';

export default function createVoronoiTreemap(data, selector, options) {
  const svg = d3
    .select(selector)
    .append('svg')
    .classed('voronoi-treemap', true)
    .attr('width', options.width)
    .attr('height', options.height);

  const layout = voronoiTreemap().size([options.width, options.height]);

  const root = d3.hierarchy(data).sum((d) => d.value);
  layout(root);

  const cells = root.descendants().filter((d) => d.depth);

  const categoryColor = scaleOrdinal(schemeCategory10);

  const groups = svg
    .selectAll('g')
    .data(cells)
    .enter()
    .append('g')
    .attr('fill', (d) => {
      if (d.depth === 1) {
        return categoryColor(d.data.name);
      } if (d.depth === 2) {
        const parentCategory = d.parent.data.name;
        const parentColor = categoryColor(parentCategory);
        const interpolator = interpolateRgbBasis([parentColor, 'white']);
        return interpolator(d.data.value / d.parent.value);
      }
    })
    .attr('stroke', 'black');

  groups
    .append('path')
    .attr('d', (d) => d3.line().curve(d3.curveLinearClosed)(d.polygon))
    .attr('opacity', 0.8)
    .attr('stroke-width', 1);

  groups
    .append('text')
    .attr('x', (d) => d3.polygonCentroid(d.polygon)[0])
    .attr('y', (d) => d3.polygonCentroid(d.polygon)[1])
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .text((d) => d.data.name)
    .style('font-size', '12px')
    .style('fill', 'white');
}
// import { scaleOrdinal, schemeCategory10, interpolateRgbBasis } from 'd3';
// // import { polygonClip as clip } from 'd3-polygon';

// // import { scaleOrdinal, schemeCategory10, interpolateRgbBasis } from 'd3';
// import { intersection } from 'polygon-clipping';

// export default function createVoronoiTreemap(data, selector, options) {
//     options.shape = 'circle';
//     if(options.shape === 'circle'){
//         options.width = options.width * 2;
//         options.height = options.height * 2;
//     }

//   const svg = d3
//     .select(selector)
//     .append('svg')
//     .classed('voronoi-treemap', true)
//     .attr('width', options.width)
//     .attr('height', options.height);

//   const layout = voronoiTreemap().size([options.width, options.height]);

//   const root = d3.hierarchy(data).sum((d) => d.value);
//   layout(root);

//   const cells = root.descendants().filter((d) => d.depth);

//   const categoryColor = scaleOrdinal(schemeCategory10);

//   const clipPolygon = options.shape === 'circle'
//     ? circleToPolygon([options.width / 2, options.height / 2], Math.min(options.width, options.height) / 2, 50)
//     : [
//       [0, 0],
//       [options.width, 0],
//       [options.width, options.height],
//       [0, options.height]
//     ];

//   const groups = svg
//     .selectAll('g')
//     .data(cells)
//     .enter()
//     .append('g')
//     .attr('fill', (d) => {
//       if (d.depth === 1) {
//         return categoryColor(d.data.name);
//       } if (d.depth === 2) {
//         const parentCategory = d.parent.data.name;
//         const parentColor = categoryColor(parentCategory);
//         const interpolator = interpolateRgbBasis([parentColor, 'white']);
//         return interpolator(d.data.value / d.parent.value);
//       }
//     })
//     .attr('stroke', 'black');

//   groups
//     .append('path')
//     .attr('d', (d) => {
//       const subjectPolygon = [d.polygon];
//       const clippingPolygon = [clipPolygon];
//       const clippedPolygon = intersection(subjectPolygon, clippingPolygon);

//       // Ensure there's a result, otherwise return an empty path
//       if (clippedPolygon.length === 0) {
//         return '';
//       }

//       return d3.line().curve(d3.curveLinearClosed)(clippedPolygon[0][0]);
//     })
//     .attr('opacity', 0.8)
//     .attr('stroke-width', 1);

//   groups
//     .append('text')
//     .attr('x', (d) => d3.polygonCentroid(d.polygon)[0])
//     .attr('y', (d) => d3.polygonCentroid(d.polygon)[1])
//     .attr('text-anchor', 'middle')
//     .attr('dy', '.35em')
//     .text((d) => d.data.name)
//     .style('font-size', '12px')
//     .style('fill', 'white');
// }

// function circleToPolygon(center, radius, numSides) {
//   const angle = (2 * Math.PI) / numSides;
//   return Array.from({ length: numSides }, (_, i) => [
//     center[0] + radius * Math.cos(i * angle),
//     center[1] + radius * Math.sin(i * angle)
//   ]);
// }
