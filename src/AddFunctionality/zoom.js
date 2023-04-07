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
export default function addZooming(selector) {
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
}
