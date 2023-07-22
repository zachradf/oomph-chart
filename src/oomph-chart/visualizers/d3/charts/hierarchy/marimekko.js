// export default function createMarimekkoChart(data, options, chartComponents) {
//   const { svg } = chartComponents;

//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

//   const x = d3.scaleBand()
//     .domain(data.map((d) => d.category))
//     .range([0, options.width - options.margin.left - options.margin.right])
//     .padding(0.1);

//   const y = d3.scaleLinear()
//     .domain([0, 1])
//     .range([options.height - options.margin.top - options.margin.bottom, 0]);

//   const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//   const parentRects = g.selectAll('.parent-rect')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'parent-rect')
//     .attr('transform', (d) => `translate(${x(d.category)}, 0)`);

//   parentRects.each(function (parentData) {
//     const parentGroup = d3.select(this);
//     let yOffset = 0;

//     parentData.children.forEach((childData) => {
//       parentGroup
//         .append('rect')
//         .datum(childData)
//         .attr('x', 0)
//         .attr('y', (d) => {
//           const yPos = yOffset;
//           yOffset += y(0) - y(d.percentage);
//           return yPos;
//         })
//         .attr('width', x.bandwidth())
//         .attr('height', (d) => y(0) - y(d.percentage))
//         .style('fill', (d) => colorScale(d.subCategory))
//         .attr('class', 'child-rect')
//         .text((d) => d.subCategory)
//         .attr('text-color', 'white');

//       // Add subcategory text
//       parentGroup
//         .append('text')
//         .datum(childData)
//         .attr('x', x.bandwidth() / 2)
//         .attr('y', yOffset - 30 / 2) // Adjust the position of the text
//         .attr('text-anchor', 'middle')
//         .attr('dominant-baseline', 'central')
//         .text((d) => d.subCategory)
//         .style('fill', 'white');
//     });
//   });

//   g.append('g')
//     .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
//     .call(d3.axisBottom(x));

//   g.append('g')
//     .call(d3.axisLeft(y));
// }
export default function createMarimekkoChart(data, options, chartComponents) {
  const { svg } = chartComponents;

  const g = svg
    .append('g')
    .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, options.width - options.margin.left - options.margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, 1])
    .range([options.height - options.margin.top - options.margin.bottom, 0]);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const parentRects = g.selectAll('.parent-rect')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'parent-rect')
    .attr('transform', (d) => `translate(${x(d.category)}, 0)`);

  parentRects.each(function (parentData) {
    const parentGroup = d3.select(this);
    let yOffset = 0;

    parentData.children.forEach((childData) => {
      parentGroup
        .append('rect')
        .datum(childData)
        .attr('x', 0)
        .attr('y', () => {
          const yPos = yOffset;
          yOffset += y(0) - y(childData.value);
          return yPos;
        })
        .attr('width', x.bandwidth())
        .attr('height', () => y(0) - y(childData.value))
        .style('fill', () => colorScale(childData.name))
        .attr('class', 'child-rect')
        .text(() => childData.name)
        .attr('text-color', 'white');

      // Add subcategory text
      parentGroup
        .append('text')
        .datum(childData)
        .attr('x', x.bandwidth() / 2)
        .attr('y', yOffset - 30 / 2) // Adjust the position of the text
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text(() => childData.name)
        .style('fill', 'white');
    });
  });

  g.append('g')
    .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
    .call(d3.axisBottom(x));

  g.append('g')
    .call(d3.axisLeft(y));
}
