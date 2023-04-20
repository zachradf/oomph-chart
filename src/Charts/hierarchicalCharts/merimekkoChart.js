// import { scaleBand, scaleLinear, select } from 'd3';

// export default function createMarimekkoChart(data, selector, options) {
//   const svg = select(selector)
//     .append('svg')
//     .classed('marimekko-chart', true)
//     .attr('width', options.width)
//     .attr('height', options.height);

//   const g = svg
//     .append('g')
//     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

//   const x = scaleBand()
//     .domain(data.map((d) => d.category))
//     .range([0, options.width - options.margin.left - options.margin.right])
//     .padding(0.1);

//   const y = scaleLinear()
//     .domain([0, 1])
//     .range([options.height - options.margin.top - options.margin.bottom, 0]);

//   const ySub = scaleBand()
//     .domain(data.flatMap((d) => d.children.map((c) => c.subCategory)))
//     .range([0, y(0)]);

//   const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//   const parentRects = g.selectAll('.parent-rect')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'parent-rect')
//     .attr('transform', (d) => `translate(${x(d.category)}, 0)`);

//   parentRects.each(function (parentData) {
//     const parentGroup = d3.select(this);
//     const yOffset = 0;

//     // Calculate the total height of children rectangles
//     const totalHeight = parentData.children.reduce((acc, child) => acc + child.percentage, 0);

//     // Set the height attribute for the parent rectangle
//     parentGroup.attr('height', y(0) - y(totalHeight));
//     parentData.children.forEach((childData) => {
//       parentRects
//         .selectAll('rect')
//         .data((d) => d.children)
//         .enter()
//         .append('rect')
//         .attr('x', 0)
//         .attr('y', (d) => y(d.percentage))
//         .attr('width', x.bandwidth())
//         .attr('height', (d) => y(0) - y(d.percentage))
//         .style('fill', (d) => colorScale(d.subCategory));

//       g.append('g')
//         .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
//         .call(d3.axisBottom(x));

//       g.append('g')
//         .call(d3.axisLeft(y));
//     });
//   });
// }
import { scaleBand, scaleLinear, select } from 'd3';

export default function createMarimekkoChart(data, selector, options) {
  const svg = select(selector)
    .append('svg')
    .classed('marimekko-chart', true)
    .attr('width', options.width)
    .attr('height', options.height);

  const g = svg
    .append('g')
    .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

  const x = scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, options.width - options.margin.left - options.margin.right])
    .padding(0.1);

  const y = scaleLinear()
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
        .attr('y', (d) => {
          const yPos = yOffset;
          yOffset += y(0) - y(d.percentage);
          return yPos;
        })
        .attr('width', x.bandwidth())
        .attr('height', (d) => y(0) - y(d.percentage))
        .style('fill', (d) => colorScale(d.subCategory))
        .attr('class', 'child-rect')
        .text((d) => d.subCategory)
        .attr('text-color', 'white');

      // Add subcategory text
      parentGroup
        .append('text')
        .datum(childData)
        .attr('x', x.bandwidth() / 2)
        .attr('y', yOffset - 30 / 2) // Adjust the position of the text
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text((d) => d.subCategory)
        .style('fill', 'white');
    });
  });

  g.append('g')
    .attr('transform', `translate(0, ${options.height - options.margin.top - options.margin.bottom})`)
    .call(d3.axisBottom(x));

  g.append('g')
    .call(d3.axisLeft(y));
}
