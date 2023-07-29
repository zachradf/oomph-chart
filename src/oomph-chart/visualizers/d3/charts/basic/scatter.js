// import simplify from 'simplify-js';

// const originalData = [...]; // Array of {x, y} points
// const tolerance = 1; // Adjust this value to increase/decrease simplification
// const highQuality = false; // Whether to use slower but higher-quality algorithm

// const simplifiedData = simplify(originalData, tolerance, highQuality);
export default function createD3ScatterPlot(data, options, chartComponents) {
  const { x } = chartComponents;
  const { y } = chartComponents;
  const { svg } = chartComponents;
  const { nodeRadius, color } = options;

  // Create circles for each data point
  svg.append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => x(d.x)) // Set the x-coordinate of the circle center
    .attr('cy', (d) => y(d.y)) // Set the y-coordinate of the circle center
    .attr('r', nodeRadius) // Set the circle radius
    .attr('fill', `${color}`);
}
