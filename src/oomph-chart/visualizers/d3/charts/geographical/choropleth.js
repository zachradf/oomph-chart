import { geoPath } from 'd3-geo';
import geoData from '../../../../../sample-data/geo-json/geo-usa';

const createColorScale = (dataset, colorRange) => {
  const maxVal = d3.max(dataset, (d) => d.value);
  const minVal = d3.min(dataset, (d) => d.value);
  const interpolator = d3.interpolateRgb(colorRange[0], colorRange[1]);
  return d3.scaleSequential(interpolator)
    .domain([minVal, maxVal]);
};

export default function createChoropleth(dataset, selector, options) {
  // Parse the data
  const parsedData = {};
  dataset.forEach((d) => {
    parsedData[d.id] = +d.value;
  });

  // Set the options
  const { width, height, colorRange } = options;

  // Create the color scale
  const colorScale = createColorScale(dataset, colorRange);

  console.log('colorscale', colorScale(60), parsedData);

  // Create the SVG
  const svg = d3.select(selector)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create the projection
  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], geoData);
  // Create the map
  svg.append('g')
    .selectAll('path')
    .data(geoData.features)
    .enter()
    .append('path')
    .attr('d', geoPath().projection(projection)) // Apply the projection to the geoPath.
    .attr('stroke', 'black')
    .style('fill', (d) => {
      console.log('IN THE FILL LINe', d.properties);
      if (parsedData[d.properties.STATE]) {
        return colorScale(parsedData[d.properties.STATE]);
      } return 'white';
    });
}
