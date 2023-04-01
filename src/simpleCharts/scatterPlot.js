export default function createD3ScatterPlot(data, selector, options) {
    const width = options.width;//USED IN LINE, SCATTER AND BAR
    const height = options.height//USED IN LINE, SCATTER AND BAR
    const margin = options.margin//USED IN LINE, SCATTER AND BAR

    // Create the x scale, using a linear scale with nice domain boundaries
    const x = d3.scaleLinear()//USED IN BOTH SCATTER AND LINE
      .domain(d3.extent(data, d => d.x)).nice() //USED IN BOTH SCATTER AND LINE
      .range([margin.left, width - margin.right]);//USED IN LINE, SCATTER AND BAR
  
    // Create the y scale, using a linear scale with nice domain boundaries
    const y = d3.scaleLinear()//USED IN LINE, SCATTER AND BAR 
      .domain(d3.extent(data, d => d.y)).nice()//COULD BE USED IN LINE, SCATTER AND BAR
      .range([height - margin.bottom, margin.top]);//USED IN LINE, SCATTER AND BAR
  
    // Define the x-axis using a bottom axis generator with custom tick settings
    const xAxis = g => g //USED IN LINE, SCATTER AND BAR
      .attr("transform", `translate(0,${height - margin.bottom})`)//USED IN LINE, SCATTER AND BAR
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));//COULD BE USED IN LINE, SCATTER AND BAR
  
    // Define the y-axis using a left axis generator with custom tick settings
    const yAxis = g => g //USED IN LINE, SCATTER AND BAR
      .attr("transform", `translate(${margin.left},0)`)//USED IN LINE, SCATTER AND BAR
      .call(d3.axisLeft(y).ticks(height / 80))//COULD BE USED IN LINE, SCATTER AND BAR
      .call(g => g.select(".domain").remove()); // Remove the default domain line //USED IN LINE, SCATTER AND BAR
  
    // Select the HTML element with the given selector and append an SVG element to it
    const svg = d3.select(selector)//USED IN LINE, SCATTER AND BAR
      .append("svg")//USED IN LINE, SCATTER AND BAR
      .attr("width", width)//USED IN LINE, SCATTER AND BAR
      .attr("height", height);//USED IN LINE, SCATTER AND BAR
  
    // Create circles for each data point
    svg.append("g")//USED IN BOTH SCATTER AND BAR
      .attr("fill", `${options.color}`)//USED IN LINE, SCATTER AND BAR
      .selectAll("circle")
      .data(data)//USED IN BOTH SCATTER AND BAR
      .join("circle")
      .attr("cx", d => x(d.x)) // Set the x-coordinate of the circle center //COULD BE USED IN BOTH SCATTER AND BAR
      .attr("cy", d => y(d.y)) // Set the y-coordinate of the circle center //COULD BE USED IN BOTH SCATTER AND BAR
      .attr("r", options.radius); // Set the circle radius
  
    // Append the x-axis to the SVG
    svg.append("g")//USED IN LINE, SCATTER AND BAR
      .call(xAxis);//USED IN LINE, SCATTER AND BAR
  
    // Append the y-axis to the SVG
    svg.append("g")//USED IN LINE, SCATTER AND BAR
      .call(yAxis);//USED IN LINE, SCATTER AND BAR
  }
  