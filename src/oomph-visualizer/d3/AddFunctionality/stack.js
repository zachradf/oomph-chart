// function createStackedCharts(chartFunctions, selector, options) {
//   // Create the container for the stacked charts
//   const container = d3.select(selector)
//     .style('position', 'relative')
//     .style('width', `${options.width}px`)
//     .style('height', `${options.height}px`);

//   // Calculate individual chart height
//   const chartHeight = options.height / chartFunctions.length;

//   // Iterate through the chart functions and create a div container for each chart
//   chartFunctions.forEach((chartFunction, index) => {
//     // Create a div container for the chart
//     const chartContainer = container.append('div')
//       .style('position', 'absolute')
//       .style('left', '0')
//       .style('top', `${index * chartHeight}px`)
//       .style('width', `${options.width}px`)
//       .style('height', `${chartHeight}px`);

//     // Call the chart function with the created chart container
//     chartFunction(chartContainer.node());
//   });
// }

// export default function createCombinedChart(chartFunctions, data, selector, options) {
//   console.log('THIS IS SELECTOR', selector);
//   console.log('THIS IS OPTIONS', options);
//   console.log('THIS IS DATA', data);
//   console.log('THIS IS CHARTFUNCTIONS', chartFunctions);
//   // Set up the SVG container
//   const svg = d3.select(selector)
//     .append('svg')
//     .attr('width', options.width + options.margin.left + options.margin.right)
//     .attr('height', options.height + options.margin.top + options.margin.bottom);

//   const g = svg.append('g')
//     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

//   // Draw the charts by calling each chart function with the SVG container
//   chartFunctions.forEach((chartFunction) => {
//     chartFunction(data, g, options);
//   });
// }
// // createCombinedChart();
export default function stack(selector, chartConfigs, generalElements) {
  // const container = createSvgContainer(selector, {
  //   width: 600,
  //   height: 400,
  // });

  chartConfigs.forEach((config) => {
    config.chartFn(config.data, config.generalElements.svg, config.options, generalElements);
  });
}
