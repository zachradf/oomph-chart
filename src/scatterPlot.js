export default function createD3ScatterPlot(data, selector, options) {
    const width = options.width;//USED IN ALL
    const height = options.height//USED IN ALL
    const margin = options.margin//USED IN ALL

    // Create the x scale, using a linear scale with nice domain boundaries
    const x = d3.scaleLinear()//USED IN SCATTER AND LINE
      .domain(d3.extent(data, d => d.x)).nice() //USED IN SCATTER AND LINE
      .range([margin.left, width - margin.right]);//USED IN ALL
  
    // Create the y scale, using a linear scale with nice domain boundaries
    const y = d3.scaleLinear()//USED IN ALL 
      .domain(d3.extent(data, d => d.y)).nice()//COULD BE USED IN ALL
      .range([height - margin.bottom, margin.top]);//USED IN ALL
  
    // Define the x-axis using a bottom axis generator with custom tick settings
    const xAxis = g => g //USED IN ALL
      .attr("transform", `translate(0,${height - margin.bottom})`)//USED IN ALL
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));//COULD BE USED IN ALL
  
    // Define the y-axis using a left axis generator with custom tick settings
    const yAxis = g => g //USED IN ALL
      .attr("transform", `translate(${margin.left},0)`)//USED IN ALL
      .call(d3.axisLeft(y).ticks(height / 80))//COULD BE USED IN ALL
      .call(g => g.select(".domain").remove()); // Remove the default domain line //USED IN ALL
  
    // Select the HTML element with the given selector and append an SVG element to it
    const svg = d3.select(selector)//USED IN ALL
      .append("svg")//USED IN ALL
      .attr("width", width)//USED IN ALL
      .attr("height", height);//USED IN ALL
  
    // Create circles for each data point
    svg.append("g")//USED IN BOTH
      .attr("fill", `${options.color}`)//USED IN ALL
      .selectAll("circle")
      .data(data)//USED IN BOTH
      .join("circle")
      .attr("cx", d => x(d.x)) // Set the x-coordinate of the circle center //COULD BE USED IN BOTH
      .attr("cy", d => y(d.y)) // Set the y-coordinate of the circle center //COULD BE USED IN BOTH
      .attr("r", options.radius); // Set the circle radius
  
    // Append the x-axis to the SVG
    svg.append("g")//USED IN ALL
      .call(xAxis);//USED IN ALL
  
    // Append the y-axis to the SVG
    svg.append("g")//USED IN ALL
      .call(yAxis);//USED IN ALL
  }
  