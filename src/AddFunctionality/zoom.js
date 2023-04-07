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
  }
}
