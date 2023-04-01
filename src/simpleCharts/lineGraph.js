export default function createD3LineGraph(data, selector, options ) {
    const width = options.width;
    const height = options.height;
    const margin = options.margin;
  
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x)).nice()
      .range([margin.left, width - margin.right]);
  
    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y)).nice()
      .range([height - margin.bottom, margin.top]);
  
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 80))
      .call(g => g.select(".domain").remove());
  
    const line = d3.line()//Unique to line graph
      .x(d => x(d.x))
      .y(d => y(d.y));
  
    const svg = d3.select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    svg.append("path")
      .datum(data) //TO DO LOOK INTO DATA VS DATUM
      .attr("fill", "none")
      .attr("stroke", options.strokeColor || "steelblue")//Unique to line graph
      .attr("stroke-width", options.strokeWidth || 1.5)//Unique to line graph
      .attr("d", line);
  
    svg.append("g")
      .call(xAxis);
  
    svg.append("g")
      .call(yAxis);
  }
  