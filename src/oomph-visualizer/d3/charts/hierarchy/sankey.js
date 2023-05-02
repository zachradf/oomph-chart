import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

export default function createSankeyDiagram(data, selector, options) {
  const {
    width,
    height,
    nodeWidth,
    nodePadding,
  } = options;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  console.log('data', data, 'selector', selector, 'options', options);

  const svg = d3
    .select(selector)
    .append('svg')
    .classed('sankey-diagram', true)
    .attr('width', width)
    .attr('height', height)
    .append('g');

  const sankey = d3Sankey()
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([[1, 1], [width - 1, height - 5]]);

  const { nodes, links } = sankey(data);
  console.log('nodes', nodes, 'links', links);

  svg.append('g')
    .selectAll('rect')
    .data(nodes)
    .join('rect')
    .attr('x', (d) => d.x0)
    .attr('y', (d) => d.y0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('fill', (d) => color(d.index))
    .attr('stroke', '#000');

  svg.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .attr('x', (d) => d.x0 - 6)
    .attr('y', (d) => (d.y1 + d.y0) / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', `${options.textAnchor}`)
    .text((d) => d.name)
    .style('font-size', '12px')
    .style('fill', '#000')
    .filter((d) => d.x0 < width / 2)
    .attr('x', (d) => d.x1 + 6)
    .attr('text-anchor', 'start');

  svg.append('g')
    .selectAll('path')
    .data(links)
    .join('path')
    .attr('d', sankeyLinkHorizontal())
    .attr('fill', 'none')
    .attr('stroke', (d) => color(d.source.index))
    .attr('stroke-opacity', 0.5)
    .attr('stroke-width', (d) => Math.max(1, d.width));
}
