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

export default function createPointMap(dataset, selector, options) {
  // Parse the data
  const parsedData = {};
  dataset.forEach((d) => {
    parsedData[d.id] = +d.value;
  });

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

  // Create the points
  svg.append('g')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => projection([d.long, d.lat])[0])
    .attr('cy', (d) => projection([d.long, d.lat])[1])
    .attr('r', (d) => (options.relativeNode ? Math.sqrt(d.value) : options.radius)) // Change this to set the size of the circles
    .attr('fill', (d) => colorScale(d.value))
    .attr('opacity', options.opacity);
}
