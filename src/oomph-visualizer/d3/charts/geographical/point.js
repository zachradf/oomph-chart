// import geoJsonData from '../../../../sample-data/geo-json/geo';
import geoJsonData from '../../../../sample-data/geo-json/geo-usa';

export default function createPointMap(dataset, options, selector) {
  console.log('geoJsonData:', geoJsonData);
  const margin = {
    top: 30, right: 20, bottom: 20, left: 20,
  };
  const width = options.width - margin.left - margin.right;
  const height = options.height - margin.top - margin.bottom;

  const svg = d3.select(selector)
    .append('svg')
    .attr('width', options.width)
    .attr('height', options.height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  //   const projection = d3.geoAlbersUsa().fitSize([width, height], geoJsonData);
  const projection = d3.geoMercator().fitSize([width, height], geoJsonData);
  const pathGenerator = d3.geoPath().projection(projection);
  const countries = svg.selectAll('path')
    .data(geoJsonData.features)
    .enter()
    .append('path')
    .attr('d', pathGenerator)
    .attr('fill', 'lightgray') // You can set the fill color for the map
    .attr('stroke', 'white') // You can set the stroke color for the map
    .attr('stroke-width', 1); // You can set the stroke width for the map

  console.log('NUMNUM', projection([dataset[0].coordinates[0], dataset[0].coordinates[1]]));
  const circle = svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => projection([d.coordinates[0], d.coordinates[1]])[0])
    .attr('cy', (d) => projection([d.coordinates[0], d.coordinates[1]])[1])
    .attr('r', 5)
    .attr('fill', options.colorScale);

  const labels = svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .attr('x', (d) => projection(d.coordinates[0]))
    .attr('y', (d) => projection(d.coordinates[1]))
    .attr('text-anchor', 'middle')
    .attr('font-size', `${options.fontSize}px`)
    .text((d, i) => `Point ${i + 1}`);

  if (options.title) {
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .text(options.title);
  }
}
