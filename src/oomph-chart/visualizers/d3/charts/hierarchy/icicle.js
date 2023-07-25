// // export default function createIcicleChart(data, options, chartComponents) {
// //   const width = options.width || 960;
// //   const height = options.height || 500;

// //   const color = d3.scaleOrdinal()
// //     .domain(d3.range(options.colorScheme.length))
// //     .range(options.colorScheme);
// //   const { svg } = chartComponents;

// //   const partition = (data) => {
// //     const root = d3.hierarchy(data)
// //       .sum((d) => d.value)
// //       .sort((a, b) => b.height - a.height || b.value - a.value);
// //     return d3.partition()
// //       .size([height, width])
// //       .padding(1)(root);
// //   };

// //   const root = partition(data);
// //   const nodes = root.descendants();

// //   svg.selectAll('.node')
// //     .data(nodes)
// //     .enter().append('rect')
// //     .attr('class', 'node')
// //     .attr('x', (d) => d.x0)
// //     .attr('y', (d) => d.y0)
// //     .attr('width', (d) => (d.x1 - d.x0))
// //     .attr('height', (d) => (d.y1 - d.y0))
// //     .style('fill', (d) => color((d.children ? d : d.parent).data.name));

// //   svg.selectAll('.label')
// //     .data(nodes.filter((d) => d.x1 - d.x0 > 6))
// //     .enter().append('text')
// //     .attr('class', 'label')
// //     .attr('dy', '.35em')
// //     .attr('transform', (d) => `translate(${(d.x0 + d.x1) / 2},${(d.y0 + d.y1) / 2})rotate(90)`)
// //     .text((d) => d.data.name)
// //     .style('font-size', `${options.childTextSize}`);
// // }
// export default function createIcicleChart(data, options, chartComponents) {
//   const width = options.width || 960;
//   const height = options.height || 500;

//   const color = d3.scaleOrdinal()
//     .domain(d3.range(options.colorScheme.length))
//     .range(options.colorScheme);

//   const { svg } = chartComponents;

//   const partition = (data) => {
//     const root = d3.hierarchy({ children: data }, (d) => d.children)
//       .sum((d) => d.value)
//       .sort((a, b) => b.height - a.height || b.value - a.value);
//     return d3.partition()
//       .size([height, width])
//       .padding(1)(root);
//   };

//   const root = partition(data);
//   const nodes = root.descendants();

//   svg.selectAll('.node')
//     .data(nodes)
//     .enter().append('rect')
//     .attr('class', 'node')
//     .attr('x', (d) => d.x0)
//     .attr('y', (d) => d.y0)
//     .attr('width', (d) => (d.x1 - d.x0))
//     .attr('height', (d) => (d.y1 - d.y0))
//     .style('fill', (d) => color((d.children ? d : d.parent).data.name));

//   svg.selectAll('.label')
//     .data(nodes.filter((d) => d.x1 - d.x0 > 6))
//     .enter().append('text')
//     .attr('class', 'label')
//     .attr('dy', '.35em')
//     .attr('transform', (d) => `translate(${(d.x0 + d.x1) / 2},${(d.y0 + d.y1) / 2})rotate(90)`)
//     .text((d) => {
//       console.log(d.data.name);
//       return d.data.category || d.data.name;
//     })
//     .style('font-size', `${options.childTextSize}`);
// }
export default function createIcicleChart(data, options, chartComponents) {
  const width = options.width || 960;
  const height = options.height || 500;

  const color = d3.scaleOrdinal()
    .domain(d3.range(options.colorScheme.length))
    .range(options.colorScheme);

  const { svg } = chartComponents;

  const partition = (data) => {
    const root = d3.hierarchy({ children: data }, (d) => d.children)
      .sum((d) => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);
    return d3.partition()
      .size([height, width])
      .padding(1)(root);
  };

  const root = partition(data);
  const nodes = root.descendants();

  svg.selectAll('.node')
    .data(nodes)
    .enter().append('rect')
    .attr('class', 'node')
    .attr('x', (d) => d.x0)
    .attr('y', (d) => d.y0)
    .attr('width', (d) => (d.x1 - d.x0))
    .attr('height', (d) => (d.y1 - d.y0))
    .style('fill', (d) => color((d.children ? d : d.parent).data.name));

  svg.selectAll('.label')
    .data(nodes.filter((d) => d.x1 - d.x0 > 6))
    .enter().append('text')
    .attr('class', 'label')
    .attr('dy', '.35em')
    // .attr('transform', (d) => `translate(${(d.y0 + d.y1) / 2},${(d.x0 + d.x1) / 2})rotate(90)`)
    .attr('transform', (d) => `translate(${(d.x0 + d.x1) / 2},${(d.y0 + d.y1) / 2})rotate(90)`)
    .text((d) => {
      if (d.depth === 1) {
        return d.data.category;
      } if (d.depth >= 2) {
        return d.data.name;
      }
    })
    .style('font-size', `${options.childTextSize}`);
}
