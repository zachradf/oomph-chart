import { voronoiTreemap } from 'd3-voronoi-treemap';

export default function createVoronoiTreemap(data, options, generalElements) {
  const { svg } = generalElements;

  const layout = voronoiTreemap().size([options.width, options.height]);

  const root = d3.hierarchy(data).sum((d) => d.value);
  layout(root);

  const cells = root.descendants().filter((d) => d.depth);

  const categoryColor = d3.scaleOrdinal(d3.schemeCategory10);

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
        const interpolator = d3.interpolateRgbBasis([parentColor, 'white']);
        return interpolator(d.data.value / d.parent.value);
      }
    })
    .attr('stroke', 'black')
    .attr('font-size', `${options.parentTextSize}`);

  groups
    .append('path')
    .attr('d', (d) => d3.line().curve(d3.curveLinearClosed)(d.polygon))
    .attr('opacity', 0.8)
    .attr('stroke-width', 1);

  groups
    .append('text')
    .attr('x', (d) => d3.polygonCentroid(d.polygon)[0])
    .attr('y', (d) => d3.polygonCentroid(d.polygon)[1])
    .attr('text-anchor', `${options.textAnchor}}`)
    .attr('dy', '.35em')
    .text((d) => d.data.name)
    .style('font-size', `${options.childTextSize}`)
    .style('fill', 'white');
}
