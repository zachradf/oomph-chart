// for bar chart
// export default function applyColorGradient(selector, color1, color2) {
//   const svg = d3.select(selector).select('svg');
//   const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.value);
//   const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.value);

//   const colorScale = d3.scaleLinear()
//     .domain([minValue, maxValue])
//     .range([color1, color2]);

//   svg.selectAll('rect').style('fill', (d) => colorScale(d.value));
// }
// for scatter plot
// export default function applyColorGradient(selector, color1, color2, type, axis) {
//   const svg = d3.select(selector).select('svg');

//   if (type === 'BAR') {
//     const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.value);
//     const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.value);

//     const colorScale = d3.scaleLinear()
//       .domain([minValue, maxValue])
//       .range([color1, color2]);

//     svg.selectAll('rect').style('fill', (d) => colorScale(d.value));
//   } else if (type === 'SCATTER') {
//     let maxValue; let minValue; let
//       valueAccessor;
//     if (axis === 'x') {
//       maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.x);
//       minValue = d3.min(svg.selectAll('circle').data(), (d) => d.x);
//       valueAccessor = (d) => d.x;
//     } else if (axis === 'y') {
//       maxValue = d3.max(svg.selectAll('circle').data(), (d) => d.y);
//       minValue = d3.min(svg.selectAll('circle').data(), (d) => d.y);
//       valueAccessor = (d) => d.y;
//     }

//     const colorScale = d3.scaleLinear()
//       .domain([minValue, maxValue])
//       .range([color1, color2]);

//     svg.selectAll('circle').style('fill', (d) => colorScale(valueAccessor(d)));
//   }
// }

export default function applyColorGradient(selector, color1, color2, type, axis, data) {
  const svg = d3.select(selector).select('svg');

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

  if (type === 'BAR') {
    if (axis === 'y') {
      gradient.attr('y1', svg.select('.y-axis').node().getBBox().height)
        .attr('y2', 0);

      svg.selectAll('rect').style('fill', 'url(#gradient)');
    } else if (axis === 'x') {
      const maxValue = d3.max(svg.selectAll('rect').data(), (d) => d.value);
      const minValue = d3.min(svg.selectAll('rect').data(), (d) => d.value);

      const colorScale = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([color1, color2]);

      svg.selectAll('rect').style('fill', (d) => colorScale(d.value));
    }
  } else if (type === 'SCATTER') {
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
  } else if (type === 'PIE') {
    const minValue = d3.min(data, (d) => d.value);
    const maxValue = d3.max(data, (d) => d.value);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('path')
      .attr('fill', (d) => colorScale(d.value));
  } else if (type === 'DONUT') {
    const minValue = d3.min(data, (d) => d.value);
    const maxValue = d3.max(data, (d) => d.value);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('path')
      .attr('fill', (d) => colorScale(d.data.value));
  } else if (type === 'AREA' || type === 'LINE') {
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
    if (type === 'AREA') {
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
  } else if (type === 'RADAR') {
    // Get the width and height of the SVG element
    const svgBoundingBox = svg.node().getBBox();
    const { width } = svgBoundingBox;
    const { height } = svgBoundingBox;
    const minValue = 0;
    const maxValue = d3.max(data, (d) => d.value); // Calculate the max value from data

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    // Calculate the rScale for the radar chart
    const radius = Math.min(width, height) / 2;
    const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

    // Compute the distance from the center for each point
    const distanceFromCenter = data.map((d) => {
      const { value } = d;
      const scaledValue = rScale(value);
      return scaledValue;
    });

    // Update the radar chart path fill using the computed distance
    svg.selectAll('.radar-chart-path')
      .attr('fill', (d, i) => {
        const distances = d.map((point, index) => distanceFromCenter[index]);
        const gradientId = `radar-gradient-${i}`;
        const gradient = svg.append('linearGradient')
          .attr('id', gradientId)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', 0)
          .attr('y2', radius);

        distances.forEach((distance, index) => {
          const color = colorScale(distance);
          const offset = (index / (distances.length - 1)) * 100;

          gradient.append('stop')
            .attr('offset', `${offset}%`)
            .attr('stop-color', color);
        });

        return `url(#${gradientId})`;
      });
  } else {
    throw new Error('Unsupported chart type');
  }
}
// export default function applyColorGradient(selector, color1, color2, type, axis, data) {
//   const svg = d3.select(selector).select('svg');

//   // Determine the appropriate elements for each chart type
//   let elements;
//   if (type === 'BAR') {
//     elements = svg.selectAll('rect');
//   } else if (type === 'SCATTER') {
//     elements = svg.selectAll('circle');
//   } else if (type === 'PIE' || type === 'DONUT') {
//     elements = svg.selectAll('path');
//   } else {
//     throw new Error('Unsupported chart type');
//   }

//   // Create a function that takes a data value and returns the desired color
//   const minValue = d3.min(data, (d) => d.value);
//   const maxValue = d3.max(data, (d) => d.value);
//   const colorScale = d3.scaleLinear()
//     .domain([minValue, maxValue])
//     .range([color1, color2]);

//   const valueAccessor = (d) => {
//     if (type === 'BAR') {
//       return axis === 'x' ? d.value : d.index;
//     } if (type === 'SCATTER') {
//       return axis === 'x' ? d.x : d.y;
//     } if (type === 'PIE' || type === 'DONUT') {
//       return d.value;
//     }
//     return null;
//   };

//   // Apply the color function to the elements using the `.style` attribute
//   elements.style('fill', (d) => colorScale(valueAccessor(d)));
// }

// if (type === 'AREA' || type === 'LINE') {
//   const elements = svg.selectAll('path');

//   const minValue = d3.min(data, (d) => d.x);
//   const maxValue = d3.max(data, (d) => d.x);

//   const colorScale = d3.scaleLinear()
//     .domain([minValue, maxValue])
//     .range([color1, color2]);

//   gradient.attr('x1', svg.select('.x-axis').node().getBBox().x)
//     .attr('x2', svg.select('.x-axis').node().getBBox().width);

//   if (type === 'AREA') {
//     elements.style('fill', 'url(#gradient)');
//   } else { // LINE
//     const lineGradient = svg.append('linearGradient')
//       .attr('id', 'line-gradient')
//       .attr('gradientUnits', 'userSpaceOnUse')
//       .attr('x1', 0)
//       .attr('x2', svg.select('.x-axis').node().getBBox().width)
//       .attr('y1', 0)
//       .attr('y2', 0);

//     data.forEach((d, i, arr) => {
//       if (i === arr.length - 1) {
//         return;
//       }

//       const color = colorScale(d.x);
//       lineGradient.append('stop')
//         .attr('offset', `${(i / (arr.length - 1)) * 100}%`)
//         .attr('stop-color', color);

//       lineGradient.append('stop')
//         .attr('offset', `${((i + 1) / (arr.length - 1)) * 100}%`)
//         .attr('stop-color', color);
//     });

//     elements.style('stroke', 'url(#line-gradient)');
//   }
// }
