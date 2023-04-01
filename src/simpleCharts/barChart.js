export default function createD3BarChart(data, selector, options) {
    const width = options.width;
    const height = options.height
    const margin = options.margin
    // Create the x scale, using scaleBand to handle categorical data
    const x = d3.scaleBand()
      .domain(data.map(d => d.label)) // Extract labels from the data
      .range([margin.left, width - margin.right]) // Set the range using the margins
      .padding(0.1); // Add padding between the bars
  
    // Create the y scale, using scaleLinear for numerical data
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice() // Set the domain using the data's max value
      .range([height - margin.bottom, margin.top]); // Set the range using the margins
  
    // Define the x-axis using the x scale
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`) // Position the x-axis
      .call(d3.axisBottom(x).tickSizeOuter(0)); // Create the axis with no outer tick size
  
    // Define the y-axis using the y scale
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`) // Position the y-axis
      .call(d3.axisLeft(y)) // Create the axis
      .call(g => g.select(".domain").remove()); // Remove the y-axis line
  
    // Select the element with the given selector and create an SVG container
    const svg = d3.select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Append a group element for the bars, set the fill color and bind the data
    svg.append("g")
      .attr("fill", `${options.color || "steelblue"}`)
      .selectAll("rect")
      .data(data)
      .join("rect") // Create a rectangle for each data point
      .attr("x", d => x(d.label)) // Set the x position using the x scale
      .attr("y", d => y(d.value)) // Set the y position using the y scale
      .attr("height", d => y(0) - y(d.value)) // Set the height based on the y scale
      .attr("width", x.bandwidth()); // Set the width based on the x scale's bandwidth
  
    // Append a group element for the x-axis and call the xAxis function
    svg.append("g")
      .call(xAxis);
  
    // Append a group element for the y-axis and call the yAxis function
    svg.append("g")
      .call(yAxis);
  }
  
  
