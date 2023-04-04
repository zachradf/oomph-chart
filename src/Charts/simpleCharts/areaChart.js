export default function createD3AreaChart(data, selector, options) {
  // Set default values for width, height, and margin based on provided options
  const width = options.width 
  const height = options.height 
  const margin = options.margin 

  // Create an x-scale using the data's x values and the specified width and margin
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x)).nice()
    .range([margin.left, width - margin.right]);

  // Create a y-scale using the data's y values and the specified height and margin
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)]).nice()
    .range([height - margin.bottom, margin.top]);

  // Define the x-axis function with a bottom orientation and custom ticks
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Define the y-axis function with a left orientation and custom ticks
  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 80))
    .call(g => g.select(".domain").remove());

  // Define the area generator function using the x and y scales
  const area = d3.area()
    .x(d => x(d.x))
    .y0(height - margin.bottom)
    .y1(d => y(d.y));

  // Select the target HTML element and append an SVG element to it
  const svg = d3.select(selector)
    .append("svg")
    .classed("area-chart", true)
    .attr("width", width)
    .attr("height", height);

  // Create a path element for the area chart using the data and area generator
  // Fill the area with a color specified in the options or a default color
  svg.append("path")
    .datum(data)
    .attr("fill", options.fillColor || "steelblue")
    .attr("d", area);

  // Append the x-axis to the SVG element
  svg.append("g")//USED IN LINE, SCATTER AND BAR
  .classed("x-axis", true)
  .call(xAxis);//USED IN LINE, SCATTER AND BAR

  // Append the y-axis to the SVG
  svg.append("g")//USED IN LINE, SCATTER AND BAR
  .classed("y-axis", true)
  .call(yAxis);//USED IN LINE, SCATTER AND BAR
}
