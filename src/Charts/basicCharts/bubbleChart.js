export default function createBubbleChart(selector, data, options) {

 const diameter = options.diameter ? options.diameter : 600;
  // Prepare the data for the chart
  const root = d3
    .hierarchy({ children: data })
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  // Create the bubble layout
  const bubbleLayout = d3
    .pack()
    .size([diameter, diameter])
    .padding(1.5);

  // Apply the layout to the data
  bubbleLayout(root);

  // Create the SVG container for the chart
  const svg = d3.select(selector)
  // console.log(svg)
  //   .classed("bubble-chart", true);
    //.append("svg")
    // .attr("width", diameter)
    // .attr("height", diameter)

  // // Create the bubbles
  const nodes = svg
    // .selectAll(".node")
    // .data(root.children)
    // .enter()
    // .append("g")
    // .attr("class", "node")
    // .attr("transform", d => `translate(${d.x},${d.y})`);

  // // Add circles to the bubbles
  // nodes
  //   .append("circle")
  //   .attr("r", d => d.r)
  //   .style("fill", (d, i) => d3.schemeCategory10[i % 10]);

  // // Add labels to the bubbles
  // nodes
  //   .append("text")
  //   .attr("dy", ".3em")
  //   .style("text-anchor", "middle")
  //   .text(d => d.data.name);
}
