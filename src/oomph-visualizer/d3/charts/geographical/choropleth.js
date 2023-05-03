// async function createChoroplethMap(options, dataset, selector) {
//   const { geoJsonURL } = options;
//   const geoJson = await d3.json(geoJsonURL);
//   console.log('FEATURES', geoJson.features);

//   const width = options.width || 960;
//   const height = options.height || 600;

//   const svg = d3
//     .select(selector)
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height);

//   const projection = d3.geoMercator().fitSize([width, height], geoJson);
//   const path = d3.geoPath().projection(projection);
//   console.log('Dataset:', dataset);

//   const colorScale = d3
//     .scaleSequential()
//     .domain([options.minValue, options.maxValue])
//     .interpolator(d3.interpolateBlues);

//     svg
//     .selectAll('path')
//     .data(geoJson.features)
//     .enter()
//     .append('path')
//     .attr('fill', (d) => {
//       // console.log('Feature properties:', d.properties['name']);
//       const dataId = dataset.map((dataItem) => dataItem.id);
//       let value;
//       if (dataId.includes(d.id)) {
//         const dataItem = dataset.find((item) => item.id === d.id);
//         value = dataItem.value;
//         console.log('DATA ID', value);
//       }
//       return value === undefined ? '#ccc' : colorScale(value);
//     })
//     .attr('d', path)
//     .attr('stroke', '#000')
//     .attr('stroke-width', 0.5);
// }

// export default createChoroplethMap;
// async function createChoroplethMap(dataset, options, selector) {
//   // Fetch GeoJSON data from the API
//   const response = await fetch(options.apiUrl);
//   const geoJsonData = await response.json();

//   const margin = {
//     top: 30, right: 20, bottom: 20, left: 20,
//   };
//   const width = options.width - margin.left - margin.right;
//   const height = options.height - margin.top - margin.bottom;

//   const svg = d3.select(selector)
//     .append('svg')
//     .attr('width', options.width)
//     .attr('height', options.height)
//     .append('g')
//     .attr('transform', `translate(${margin.left},${margin.top})`);

//   const projection = d3.geoMercator()
//     .fitSize([width, height], geoJsonData);
//   const path = d3.geoPath().projection(projection);

//   const colorScale = d3.scaleQuantize()
//     .domain(d3.extent(dataset, (d) => d.value))
//     .range(d3.range(0, 1, 1 / 9).map(options.colorScale));

//   svg.selectAll('path')
//     .data(geoJsonData.features)
//     .enter()
//     .append('path')
//     .attr('d', path)
//     .attr('fill', (d) => {
//         // console.log('DATA ID', d.id);
//        console.log('BIG BAD BOOLEAN', d.id === dataset[0].id);
//       const dataItem = dataset.find((item) => item.id === d.id);
//     //   console.log('DATA ITEM', colorScale(dataItem.value));
//       return dataItem ? colorScale(dataItem.value) : '#ccc';
//     })
//     .attr('stroke', '#000000')
//     .attr('stroke-width', 1);

//   if (options.title) {
//     svg.append('text')
//       .attr('x', width / 2)
//       .attr('y', -margin.top / 2)
//       .attr('text-anchor', 'middle')
//       .attr('font-size', '18px')
//       .text(options.title);
//   }

//   if (options.showLabels) {
//     svg.selectAll('text.region-label')
//       .data(geoJsonData.features)
//       .enter()
//       .append('text')
//       .attr('class', 'region-label')
//       .attr('x', (d) => path.centroid(d)[0])
//       .attr('y', (d) => path.centroid(d)[1])
//       .attr('text-anchor', 'middle')
//       .attr('font-size', '12px')
//       .text((d) => d.properties.name);
//   }
// }

// export default createChoroplethMap;
 async function createChoroplethMap(dataset, options, selector) {
  // Fetch GeoJSON data from the API
  const response = await fetch(options.apiUrl);
  const geoJsonData = await response.json();

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

  const projection = d3.geoAlbersUsa().fitSize([width, height], geoJsonData);

  const path = d3.geoPath().projection(projection);

  const colorScale = d3.scaleQuantize()
    .domain(d3.extent(dataset, (d) => d.value))
    .range(d3.range(0, 1, 1 / 9).map(options.colorScale));

  const paths = svg.selectAll('path')
    .data(geoJsonData.features)
    .enter()
    .append('path')
    .attr('d', path);

  paths
    .attr('fill', (d) => {
      const dataItem = dataset.find((item) => item.id === d.id);
      return dataItem ? colorScale(dataItem.value) : 'none';
    })
    .attr('stroke', '#000')
    .attr('stroke-width', 1);

  if (options.title) {
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .text(options.title);
  }

  if (options.showLabels) {
    svg.selectAll('text.region-label')
      .data(geoJsonData.features)
      .enter()
      .append('text')
      .attr('class', 'region-label')
      .attr('x', (d) => path.centroid(d)[0])
      .attr('y', (d) => path.centroid(d)[1])
      .attr('text-anchor', 'middle')
      .attr('font-size', `${options.fontSize}px`)
      .text((d) => d.properties.name);
  }
}

export default createChoroplethMap;
