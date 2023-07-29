// export default function createMarimekkoChart(data, options, chartComponents) {
//   const { svg, x, y } = chartComponents;
//   data.forEach((parent) => {
//     const total = parent.children.reduce((sum, child) => sum + child.value, 0);

//     // Skip normalization if total is already 1 or 0
//     if (total === 1) return;
//     if (total === 0 || Number.isNaN(total) || total === null) console.error('Sum of children for', parent, 'is', total, ', this shoud be a non-zero number');
//     console.log('total', total);
//     parent.children.forEach((child) => {
//       child.value = total !== 0 ? child.value / total : 0;
//     });
//   });
//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

//   const colorScale = d3.scaleOrdinal()
//     .domain(d3.range(options.colorScheme.length))
//     .range(options.colorScheme);

//   const parentRects = g.selectAll('.parent-rect')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'parent-rect')
//     .attr('transform', (d) => `translate(${x(d.name)}, 0)`);

//   parentRects.each(function (parentData) {
//     const parentGroup = d3.select(this);
//     let yOffset = 0;

//     parentData.children.forEach((childData) => {
//       parentGroup
//         .append('rect')
//         .datum(childData)
//         .attr('x', 0)
//         .attr('y', () => {
//           const yPos = yOffset;
//           yOffset += y(0) - y(childData.value);
//           return yPos;
//         })
//         .attr('width', x.bandwidth())
//         .attr('height', () => y(0) - y(childData.value))
//         .style('fill', () => colorScale(childData.name))
//         .attr('class', 'child-rect')
//         .text(() => childData.name)
//         .attr('text-color', 'white');

//       // Add subcategory text
//       parentGroup
//         .append('text')
//         .datum(childData)
//         .attr('x', x.bandwidth() / 2)
//         .attr('y', yOffset - 30 / 2) // Adjust the position of the text
//         .attr('text-anchor', 'middle')
//         .attr('dominant-baseline', 'central')
//         .text(() => childData.name)
//         .style('fill', 'white');
//     });
//   });

//   // g.append('g')
//   //   .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
//   //   .call(d3.axisBottom(x));

//   // g.append('g')
//   //   .call(d3.axisLeft(y));
// }
export default function createMarimekkoChart(data, { margin, colorScheme }, chartComponents) {
  const { svg, x, y } = chartComponents;
  data.forEach((parent) => {
    const total = parent.children.reduce((sum, child) => sum + child.value, 0);

    // Skip normalization if total is already 1 or 0
    if (total === 1) return;
    if (total === 0 || Number.isNaN(total) || total === null) console.error('Sum of children for', parent, 'is', total, ', this shoud be a non-zero number');
    parent.children.forEach((child) => {
      child.value = total !== 0 ? child.value / total : 0;
    });
  });
  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const colorScale = d3.scaleOrdinal()
    .domain(d3.range(colorScheme.length))
    .range(colorScheme);

  const parentRects = g.selectAll('.parent-rect')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'parent-rect')
    .attr('transform', (d) => `translate(${x(d.name)}, 0)`);

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

  // g.append('g')
  //   .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
  //   .call(d3.axisBottom(x));

  // g.append('g')
  //   .call(d3.axisLeft(y));
}
