// import simplify from 'simplify-js';

// const originalData = [...]; // Array of {x, y} points
// const tolerance = 1; // Adjust this value to increase/decrease simplification
// const highQuality = false; // Whether to use slower but higher-quality algorithm

// const simplifiedData = simplify(originalData, tolerance, highQuality);
export default function createD3AreaChart(data, options, chartComponents) {
  const { x, y, svg } = chartComponents;
  const { fillColor } = options; // Destructuring the fillColor from options

  const isXValueNumeric = typeof data[0].x === 'number';

  // Define the area generator function using the x and y scales
  const area = d3.area()
    .x((d) => (isXValueNumeric ? x(d.x) : x(d.x) + x.bandwidth() / 2))
    .y0((d) => (d.y >= 0 ? y(0) : y(-d.y)))
    .y1((d) => y(d.y));

  const sortedData = isXValueNumeric ? data.sort((a, b) => a.x - b.x) : data;

  // Create a path element for the area chart using the data and area generator
  // Fill the area with a color specified in the fillColor or a default color
  svg.append('path')
    .datum(sortedData)
    .attr('fill', `${fillColor}`) // Using fillColor directly instead of options.fillColor
    .attr('d', area);
}
