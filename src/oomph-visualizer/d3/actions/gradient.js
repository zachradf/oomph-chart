export default function applyColorGradient(selector, color1, color2, type, axis, data) {
  const svg = d3.select(selector).select('svg');
  // type = type.slice(0, -1);
  console.log('TYPE', type);
  console.log('X AXIS', svg.select('.x-axis'));

  // Create the gradient element
  const gradient = svg.append('linearGradient')
    .attr('id', 'gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 1);

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', color1);

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', color2);

  if (type === 'bar') {
    if (axis === 'y') {
      gradient.attr('y1', svg.select('.y-axis').node().getBBox().height)
        .attr('y2', 0);

      svg.selectAll('rect').style('fill', 'url(#gradient)');
    } else if (axis === 'x') {
      const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.y);
      const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.y);

      const colorScale = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([color1, color2]);

      svg.selectAll('rect').style('fill', (d) => colorScale(d.y));
    }
  } else if (type === 'scatter') {
    let maxValue; let minValue; let
      valueAccessor;
    if (axis === 'x') {
      maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.x);
      minValue = d3.min(svg.selectAll('circle').data(), (d) => d.x);
      valueAccessor = (d) => d.x;
    } else if (axis === 'y') {
      maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.y);
      minValue = d3.min(svg.selectAll('circle').data(), (d) => d.y);
      valueAccessor = (d) => d.y;
    }
    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('circle').style('fill', (d) => colorScale(valueAccessor(d)));
  } else if (type === 'pie') {
    const minValue = d3.min(data, (d) => d.y);
    const maxValue = d3.max(data, (d) => d.y);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('path')
      .attr('fill', (d) => colorScale(d.y));
  } else if (type === 'donut') {
    const minValue = d3.min(data, (d) => d.y);
    const maxValue = d3.max(data, (d) => d.y);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('path')
      .attr('fill', (d) => colorScale(d.data.y));
  } else if (type === 'area' || type === 'line') {
    const elements = svg.selectAll('path');
    const minValue = d3.min(data, (d) => d[axis]);
    const maxValue = d3.max(data, (d) => d[axis]);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    if (axis === 'x') {
      gradient
        .attr('x1', svg.select('.x-axis').node().getBBox().x)
        .attr('x2', svg.select('.x-axis').node().getBBox().width)
        .attr('y1', 0)
        .attr('y2', 0);
    } else { // y
      gradient
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', svg.select('.y-axis').node().getBBox().height)
        .attr('y2', 0);
    }
    if (type === 'area') {
      elements.style('fill', 'url(#gradient)');
    } else { // LINE
      const lineGradient = svg.append('linearGradient')
        .attr('id', 'line-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', axis === 'x' ? 0 : svg.select('.x-axis').node().getBBox().width)
        .attr('x2', axis === 'x' ? svg.select('.x-axis').node().getBBox().width : 0)
        .attr('y1', axis === 'y' ? 0 : svg.select('.y-axis').node().getBBox().height)
        .attr('y2', axis === 'y' ? svg.select('.y-axis').node().getBBox().height : 0);

      data.forEach((d, i, arr) => {
        if (i === arr.length - 1) {
          return;
        }

        const color = colorScale(d[axis]);
        lineGradient.append('stop')
          .attr('offset', `${(i / (arr.length - 1)) * 100}%`)
          .attr('stop-color', color);

        lineGradient.append('stop')
          .attr('offset', `${((i + 1) / (arr.length - 1)) * 100}%`)
          .attr('stop-color', color);
      });

      elements.style('stroke', 'url(#line-gradient)');
    }
  } else {
    throw new Error(`Unsupported chart type ${type}`);
  }
}
// else if (type === 'radar') {
//   // Get the width and height of the SVG element
//   const svgBoundingBox = svg.node().getBBox();
//   const { width } = svgBoundingBox;
//   const { height } = svgBoundingBox;
//   const minValue = 0;
//   const maxValue = d3.max(data, (d) => d.value); // Calculate the max value from data

//   const colorScale = d3.scaleLinear()
//     .domain([minValue, maxValue])
//     .range([color1, color2]);

//   // Calculate the rScale for the radar chart
//   const radius = Math.min(width, height) / 2;
//   const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

//   // Compute the distance from the center for each point
//   const distanceFromCenter = data.map((d) => {
//     const { value } = d;
//     const scaledValue = rScale(value);
//     return scaledValue;
//   });

//   // Update the radar chart path fill using the computed distance
//   svg.selectAll('.radar-chart-path')
//     .attr('fill', (d, i) => {
//       const distances = d.map((point, index) => distanceFromCenter[index]);
//       const gradientId = `radar-gradient-${i}`;
//       const gradient = svg.append('linearGradient')
//         .attr('id', gradientId)
//         .attr('gradientUnits', 'userSpaceOnUse')
//         .attr('x1', 0)
//         .attr('x2', 0)
//         .attr('y1', 0)
//         .attr('y2', radius);

//       distances.forEach((distance, index) => {
//         const color = colorScale(distance);
//         const offset = (index / (distances.length - 1)) * 100;

//         gradient.append('stop')
//           .attr('offset', `${offset}%`)
//           .attr('stop-color', color);
//       });

//       return `url(#${gradientId})`;
//     });
// }
