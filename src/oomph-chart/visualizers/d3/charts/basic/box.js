// export default function createD3BoxPlot(rawData, options, chartComponents) {
//   if (!isBoxPlotData) console.error('Box plot data must have at least 4 values for each "x" coordinate');
//   // calculate box plot values
//   const data = d3.groups(rawData, (d) => d.x).map(([key, values]) => {
//     values = values.map((v) => v.y).sort(d3.ascending);
//     return {
//       category: key,
//       min: d3.min(values),
//       q1: d3.quantile(values, 0.25),
//       median: d3.median(values),
//       q3: d3.quantile(values, 0.75),
//       max: d3.max(values),
//     };
//   });
//   console.log(data);
//   const fillColor = options.fillColor || 'steelblue';
//   const { x } = chartComponents;
//   const { y } = chartComponents;
//   const { xAxis } = chartComponents;
//   const { yAxis } = chartComponents;
//   const { svg } = chartComponents;

//   x.domain(data.map((d) => d.category));
//   y.domain([d3.min(data, (d) => d.min), d3.max(data, (d) => d.max)]).nice();
//   // Append the x-axis to the SVG container
//   svg.append('g')
//     .attr('class', 'x-axis')
//     .attr('transform', `translate(0,${options.height - options.margin.bottom})`) // Adjust as needed
//     .call(xAxis);

//   // Append the y-axis to the SVG container
//   svg.append('g')
//     .attr('class', 'y-axis')
//     .attr('transform', `translate(${options.margin.left},0)`) // Adjust as needed
//     .call(yAxis);

//   const boxWidth = options.boxWidth || Math.min(x.bandwidth(), 50);

//   const box = svg.selectAll('.box')
//     .data(data, (d) => d.category)
//     .join('g')
//     .attr('class', 'box')
//     .attr('transform', (d) => `translate(${x(d.category)},0)`);

//   box.selectAll('.min')
//     .data((d) => [d])
//     .join('line')
//     .attr('class', 'min')
//     .attr('x1', boxWidth / 2)
//     .attr('x2', boxWidth / 2)
//     .attr('y1', (d) => y(d.min))
//     .attr('y2', (d) => y(d.q1))
//     .attr('stroke', `${options.strokeColor}` || 'black');

//   box.selectAll('.max')
//     .data((d) => [d])
//     .join('line')
//     .attr('class', 'max')
//     .attr('x1', boxWidth / 2)
//     .attr('x2', boxWidth / 2)
//     .attr('y1', (d) => y(d.q3))
//     .attr('y2', (d) => y(d.max))
//     .attr('stroke', `${options.strokeColor}` || 'black');

//   box.selectAll('.box-rect')
//     .data((d) => [d])
//     .join('rect')
//     .attr('class', 'box-rect')
//     .attr('x', 0)
//     .attr('width', boxWidth)
//     .attr('y', (d) => y(d.q3))
//     .attr('height', (d) => y(d.q1) - y(d.q3))
//     .attr('fill', fillColor);
// }

// function isBoxPlotData(data) {
//   // Group data by 'x' value
//   const groupedData = d3.groups(data, (d) => d.x);

//   // Check each group
//   groupedData.forEach((group) => {
//     const [key, values] = group;

//     // If there are less than four 'y' values for this 'x' value
//     if (values.length < 4) {
//       console.log(`Data is not in the correct format. 'x' value ${key} has less than four corresponding 'y' values.`);
//       return false;
//     }

//     // Check that all 'y' values are numbers
//     values.forEach((value) => {
//       if (typeof value.y !== 'number') {
//         console.log(`Data is not in the correct format. 'y' value for 'x' value ${key} is not a number.`);
//         return false;
//       }
//     });
//   });

//   return true;
// }
export default function createD3BoxPlot(rawData, options, chartComponents) {
  if (!isBoxPlotData) console.error('Box plot data must have at least 4 values for each "x" coordinate');

  const {
    fillColor = 'steelblue', height, margin, boxWidth, strokeColor = 'black',
  } = options;
  const {
    x, y, xAxis, yAxis, svg,
  } = chartComponents;

  const data = d3.groups(rawData, (d) => d.x).map(([key, values]) => {
    values = values.map((v) => v.y).sort(d3.ascending);
    return {
      category: key,
      min: d3.min(values),
      q1: d3.quantile(values, 0.25),
      median: d3.median(values),
      q3: d3.quantile(values, 0.75),
      max: d3.max(values),
    };
  });
  console.log(data);

  x.domain(data.map((d) => d.category));
  y.domain([d3.min(data, (d) => d.min), d3.max(data, (d) => d.max)]).nice();

  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height - margin.bottom})`) // Adjust as needed
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left},0)`) // Adjust as needed
    .call(yAxis);

  const computedBoxWidth = boxWidth || Math.min(x.bandwidth(), 50);

  const box = svg.selectAll('.box')
    .data(data, (d) => d.category)
    .join('g')
    .attr('class', 'box')
    .attr('transform', (d) => `translate(${x(d.category)},0)`);

  box.selectAll('.min')
    .data((d) => [d])
    .join('line')
    .attr('class', 'min')
    .attr('x1', computedBoxWidth / 2)
    .attr('x2', computedBoxWidth / 2)
    .attr('y1', (d) => y(d.min))
    .attr('y2', (d) => y(d.q1))
    .attr('stroke', strokeColor);

  box.selectAll('.max')
    .data((d) => [d])
    .join('line')
    .attr('class', 'max')
    .attr('x1', computedBoxWidth / 2)
    .attr('x2', computedBoxWidth / 2)
    .attr('y1', (d) => y(d.q3))
    .attr('y2', (d) => y(d.max))
    .attr('stroke', strokeColor);

  box.selectAll('.box-rect')
    .data((d) => [d])
    .join('rect')
    .attr('class', 'box-rect')
    .attr('x', 0)
    .attr('width', computedBoxWidth)
    .attr('y', (d) => y(d.q3))
    .attr('height', (d) => y(d.q1) - y(d.q3))
    .attr('fill', fillColor);
}

function isBoxPlotData(data) {
  // Group data by 'x' value
  const groupedData = d3.groups(data, (d) => d.x);

  // Check each group
  groupedData.forEach((group) => {
    const [key, values] = group;

    // If there are less than four 'y' values for this 'x' value
    if (values.length < 4) {
      console.log(`Data is not in the correct format. 'x' value ${key} has less than four corresponding 'y' values.`);
      return false;
    }

    // Check that all 'y' values are numbers
    values.forEach((value) => {
      if (typeof value.y !== 'number') {
        console.log(`Data is not in the correct format. 'y' value for 'x' value ${key} is not a number.`);
        return false;
      }
    });
  });

  return true;
}
