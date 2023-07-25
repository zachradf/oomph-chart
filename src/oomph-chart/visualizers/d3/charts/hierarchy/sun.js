// export default function createD3SunburstChart(data, options, chartComponents) {
//   // Create a color scale
//   const color = d3.scaleOrdinal(options.colorScheme);
//   const {
//     width, height, margin, radius,
//   } = options;
//   const { svg } = chartComponents;
//   // Create a partition layout
//   const partition = (data) => {
//     const root = d3.hierarchy(data)
//       .sum((d) => d.value)
//       .sort((a, b) => b.value - a.value);
//     return d3.partition()
//       .size([2 * Math.PI, root.height + 1])(root);
//   };

//   // Create an arc generator
//   const arc = d3.arc()
//     .startAngle((d) => d.x0)
//     .endAngle((d) => d.x1)
//     .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
//     .padRadius(radius * 1.5)
//     .innerRadius((d) => d.y0 * radius)
//     .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

//   // Append a group element for the sunburst chart and center it within the SVG container
//   const g = svg.append('g')
//     .attr('transform', `translate(${width / 2},${height / 2})`);

//   // Generate sunburst chart using the partition layout and arc generator
//   const nodes = g.selectAll('path')
//     .data(partition(data).descendants())
//     .enter().append('path')
//     .attr('fill', (d) => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
//     .attr('fill-opacity', (d) => (d.children ? 0.6 : 0.4))
//     .attr('d', arc)
//     .on('click', (event, d) => {
//       // Add click event for zooming in on a specific segment
//     });

//   // Add text labels to the sunburst chart
//   g.selectAll('text')
//     .data(partition(data).descendants())
//     .enter().append('text')
//     .attr('transform', (d) => {
//       const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
//       const y = (d.y0 + d.y1) / 2 * radius;
//       return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
//     })

//     .attr('text-anchor', (d) => (((d.x0 + d.x1) / 2) * 180 / Math.PI < 180 ? 'start' : 'end'))
//     .attr('dy', '0.35em')
//     .attr('font-size', options.childTextSize)
//     .text((d) => d.data.name)
//     .attr('fill-opacity', (d) => +labelVisible(d))
//     .attr('display', (d) => (labelVisible(d) ? null : 'none'));

//   // Define a function to determine label visibility based on the arc's angle
//   function labelVisible(d) {
//     return (d.y1 <= 3) && (d.y0 >= 1) && (d.x1 > d.x0 + 0.01);
//   }
// }
export default function createD3SunburstChart(data, options, chartComponents) {
  // If the data is an array, wrap it into an extra root level.
  if (Array.isArray(data)) {
    data = { category: '', children: data };
  }
  const root = d3.hierarchy(processData(data))
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
  const nonLeafNames = [...new Set(root.descendants().map((d) => (d.children ? d.data.name : '')))];

  const color = d3.scaleOrdinal()
    .domain(nonLeafNames)
    .range(options.colorScheme);
  // const color = d3.scaleOrdinal()
  //   .domain(d3.range(options.colorScheme.length))
  //   .range(options.colorScheme);

  const {
    width, height, margin, radius,
  } = options;
  const { svg } = chartComponents;

  // This function is used to process the data structure.
  function processData(d) {
    if (d.children) {
      return {
        name: d.category,
        children: d.children.map(processData),
      };
    }
    return {
      name: d.name,
      value: d.value,
    };
  }
  // const root = d3.hierarchy(processData(data))
  // .sum((d) => d.value)
  // .sort((a, b) => b.value - a.value);
  const partition = (data) => d3.partition()
    .size([2 * Math.PI, root.height + 1])(root);

  const arc = d3.arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const nodes = g.selectAll('path')
    .data(partition(data).descendants())
    .enter().append('path')
    .attr('fill', (d) => (d.children ? color(d.data.name) : color(d.parent.data.name))) // use node's name as index to color scale if it has children, else use parent's name
    .attr('fill-opacity', (d) => (d.children ? 0.6 : 0.4))
    .attr('d', arc);

  function labelVisible(d) {
    return (d.x1 > d.x0 + 0.01);
  }

  g.selectAll('text')
    .data(partition(data).descendants())
    .enter().append('text')
    .attr('transform', (d) => {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x <= 90 || x >= 270 ? 0 : 180})`;
    })
    .attr('text-anchor', (d) => ((((d.x0 + d.x1) / 2) * 180) / Math.PI < 180 ? 'start' : 'end'))
    .attr('dy', '0.35em')
    .attr('font-size', options.childTextSize)
    .text((d) => d.data.name)
    .attr('fill-opacity', (d) => +labelVisible(d))
    .attr('display', (d) => (labelVisible(d) ? null : 'none'));
}
