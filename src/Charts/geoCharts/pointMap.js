export default async function createPointMap(dataset, options, selector) {
  // Fetch GeoJSON data from the API
  const response = await fetch(options.apiUrl);
  const geoJsonData = await response.json();
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

//   const circle = svg.selectAll('circle')
//   .data(dataset)
//   .enter()
//   .append('circle')
//   .attr('cx', (d) => {
//     console.log('d:', d);
//     const cx = projection(d.coordinates[0]);
//     console.log('cx:', cx);
//     return cx;
//   })
//   .attr('cy', (d) => {
//     console.log('d:', d.coordinates[1]);
//     const cy = projection(d.coordinates[1]);
//     console.log('cy:', cy);
//     return cy;
//   })
//   .attr('r', 5)
//   .attr('fill', options.colorScale);
const projection = d3.geoMercator().fitSize([width, height], geoJsonData);

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
