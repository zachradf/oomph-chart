// export default function addZooming(selector) {
//   const svg = d3.select(selector).select('svg');
//   const group = svg.select('g');

//   const zoom = d3.zoom()
//     .scaleExtent([1, 10])
//     .on('zoom', (event) => {
//       group.attr('transform', event.transform);
//     });

//   svg.call(zoom);
// }
// export default function addZooming(selector) {
//   const svg = d3.select(selector).select('svg');
//   const group = svg.select('g');

//   const zoom = d3.zoom()
//     .scaleExtent([1, 10])
//     .on('zoom', (event) => {
//       group.attr('transform', event.transform);
//       svg.select('.x-axis').call(d3.axisBottom(event.transform.rescaleX(x)));
//       svg.select('.y-axis').call(d3.axisLeft(event.transform.rescaleY(y)));
//     });

//   const x = d3.scaleLinear().range([0, +svg.attr('width')]);
//   const y = d3.scaleLinear().range([+svg.attr('height'), 0]);

//   svg.call(zoom);
// }
export default function addZooming(selector, type) {
  if (type === 'SCATTER' || type === 'STACKEDBAR' || type === 'BAR') {
    const svg = d3.select(selector).select('svg');
    const group = svg.select('g');

    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        group.attr('transform', event.transform);
        svg.select('.x-axis').call(d3.axisBottom(event.transform.rescaleX(x)));
        svg.select('.y-axis').call(d3.axisLeft(event.transform.rescaleY(y)));
      });

    const x = d3.scaleLinear().range([0, +svg.attr('width')]);
    const y = d3.scaleLinear().range([+svg.attr('height'), 0]);

    svg.call(zoom);
  } else if (type === 'PIE' || type === 'DONUT') {
    const svg = d3.select(selector).select('svg');
    const group = svg.select('g');

    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        group.attr('transform', `translate(${svg.attr('width') / 2 + event.transform.x}, ${svg.attr('height') / 2 + event.transform.y}) scale(${event.transform.k})`);
      });

    svg.call(zoom);
  } else if (type === 'LINE') {
    const svg = d3.select(selector).select('svg');
    const x = d3.scaleLinear().range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        svg.select('.x-axis').call(d3.axisBottom(event.transform.rescaleX(x)));
        svg.select('.y-axis').call(d3.axisLeft(event.transform.rescaleY(y)));
        svg.select('path')
          .attr('transform', event.transform)
          .attr('stroke-width', options.strokeWidth / event.transform.k || 1.5 / event.transform.k);
      });

    svg.call(zoom);
  }
}
// export default function addZooming(selector, type) {
//   if (type === 'SCATTER' || type === 'STACKEDBAR' || type === 'BAR' || type === 'LINE') {
//     const svg = d3.select(selector).select('svg');
//     const group = svg.select('g');
//     const xAxis = svg.select('.x-axis');
//     const yAxis = svg.select('.y-axis');

//     const x = d3.scaleLinear().range([0, +svg.attr('width')]);
//     const y = d3.scaleLinear().range([+svg.attr('height'), 0]);

//     const zoom = d3.zoom()
//       .scaleExtent([1, 10])
//       .on('zoom', (event) => {
//         group.attr('transform', event.transform);

//         const newX = event.transform.rescaleX(x);
//         const newY = event.transform.rescaleY(y);

//         const xTickValues = xAxis.selectAll('.tick').nodes().map((node) => +node.textContent);
//         const yTickValues = yAxis.selectAll('.tick').nodes().map((node) => +node.textContent);

//         xAxis.call(d3.axisBottom(newX).tickValues(xTickValues));
//         yAxis.call(d3.axisLeft(newY).tickValues(yTickValues));

//         if (type === 'LINE') {
//           svg.select('path')
//             .attr('transform', event.transform)
//             .attr('stroke-width', options.strokeWidth / event.transform.k || 1.5 / event.transform.k);
//         }
//       });

//     svg.call(zoom);
//   } else if (type === 'PIE' || type === 'DONUT') {
//     const svg = d3.select(selector).select('svg');
//     const group = svg.select('g');

//     const zoom = d3.zoom()
//       .scaleExtent([1, 10])
//       .on('zoom', (event) => {
//         group.attr('transform', `translate(${svg.attr('width') / 2 + event.transform.x}, ${svg.attr('height') / 2 + event.transform.y}) scale(${event.transform.k})`);
//       });

//     svg.call(zoom);
//   }
// }
