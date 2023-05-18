import { geoPath } from 'd3-geo';
import geoData from '../../../../../sample-data/geo-json/geo-usa';

// Helper function to create a color scale
const createColorScale = (dataset, colorRange) => {
  const maxVal = d3.max(dataset, (d) => d.value);
  const minVal = d3.min(dataset, (d) => d.value);
  const interpolator = d3.interpolateRgb(colorRange[0], colorRange[1]);
  return d3.scaleSequential(interpolator)
    .domain([minVal, maxVal]);
};

export default function createFlowMap(dataset, selector, options) {
  // Set the options
  const { width, height, colorRange } = options;

  // Create the color scale
  const colorScale = createColorScale(dataset, colorRange);

  // Create the SVG
  const svg = d3.select(selector)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create the projection
  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], geoData);

  // Draw the US map
  svg.append('g')
    .selectAll('path')
    .data(geoData.features)
    .enter()
    .append('path')
    .attr('d', geoPath().projection(projection))
    .attr('stroke', 'black')
    .attr('fill', 'white');

  // Create the lines using d3.line
  const line = d3.line()
    .x((d) => d[0])
    .y((d) => d[1]);

  svg.append('g')
    .selectAll('path')
    .data(dataset)
    .enter()
    .append('path')
    .attr('d', (d) => {
      const from = projection([d.from.long, d.from.lat]);
      const to = projection([d.to.long, d.to.lat]);
      return line([from, to]);
    })
    .attr('stroke', (d) => colorScale(d.value))
    .attr('stroke-width', (d) => (options.relativeNode ? d.value / 10 : 1))
    .attr('opacity', options.opacity)
    .attr('fill', 'none');
}
