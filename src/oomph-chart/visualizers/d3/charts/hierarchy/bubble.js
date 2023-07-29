import { isDataInCorrectFormat } from '../../functions/format-data';

export default function createBubbleChart(data, options, chartComponents) {
  const {
    diameter, padding, opacity, textAnchor, parentTextSize, childTextSize, fontColor, height, label, colorScheme = d3.schemeCategory10,
  } = options;
  const { svg } = chartComponents;
  let rootData;
  if (isDataInCorrectFormat(data)) {
    rootData = data;
  } else {
    rootData = {
      name: `${label}`,
      children: data,
    };
  }
  const color = d3.scaleOrdinal()
    .domain(data.map((d) => d.name)) // Assuming the parent categories are identified by 'name'
    .range(colorScheme);
  // Prepare the data for the chart
  const root = d3
    .hierarchy(rootData)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  // Create the bubble layout
  const bubbleLayout = d3
    .pack()
    .size([diameter, diameter])
    .padding(padding);

  // Apply the layout to the data
  bubbleLayout(root);

  // Create the bubbles
  const nodes = svg
    .selectAll('g')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  // Add circles to the bubbles
  nodes
    .append('circle')
    .attr('r', (d) => d.r)
    .style('fill', (d) => color[d.depth])
    .style('opacity', (d) => (d.depth <= 1 ? 1 : opacity));
  // nodes
  // .append('circle')
  // .attr('r', (d) => d.r)
  // .style('fill', (d) => {
  //   // if (d.depth === 0) return '#ffffff'; // You can set the color for the root node if needed
  //   // if (d.depth === 1) return color(d.data.name); // Color based on parent category name
  //   console.log('Parent name and color', d.parent.name, color(d.parent.data.name));
  //   return color(d.parent.data.name); // Color based on parent's name for children
  // })
  // .style('opacity', (d) => (d.depth <= 1 ? 1 : opacity));

  nodes
    .append('text')
    .attr('dy', '.3em')
    .style('text-anchor', textAnchor)
    .style('font-size', (d) => {
      if (d.depth === 0) return `${parentTextSize * 2}`;
      if (d.depth === 1) return `${parentTextSize}`;
      return `${childTextSize}`;
    })
    .style('fill', fontColor)
    .text((d) => d.data.name)
    .attr('x', 0)
    .attr('y', (d) => {
      if (d.depth === 0) return -height / 3.5;
      if (d.depth === 1) return -height / 6;
      return 0;
    });

  // Adjust the position of parent category labels to be closer to their respective circles
  nodes.selectAll('text')
    .filter((d) => d.depth === 1)
    .attr('y', (d) => -d.r);
}

// Could be used to wrap text in child elements if needed
// function wrap(text, width) {
//   text.each(function () {
//     const text = d3.select(this);
//     const words = text.text().split(/\s+/).reverse();
//     let word;
//     let line = [];
//     let lineNumber = 0;
//     const lineHeight = 1.1; // ems
//     const y = text.attr('y');
//     const x = text.attr('x');
//     let tspan = text.text(null).append('tspan').attr('x', x).attr('y', y);

//     while (word = words.pop()) {
//       line.push(word);
//       tspan.text(line.join(' '));
//       if (tspan.node().getComputedTextLength() > width) {
//         line.pop();
//         tspan.text(line.join(' '));
//         line = [word];
//         tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', `${lineHeight}em`)
//           .text(word);
//         lineNumber++;
//       }
//     }
//   });
// }
