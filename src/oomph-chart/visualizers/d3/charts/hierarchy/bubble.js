import { isDataInCorrectFormat, hasValues } from '../../functions/format-data';

export default function createBubbleChart(data, options, chartComponents) {
  if (!hasValues(data)) {
    console.error(`An ${options.chartClass} diagram requires numeric child values`);
    return;
  }
  const { diameter } = options;
  const { svg } = chartComponents;
  const colorScheme = options.colorScheme || d3.schemeCategory10;
  let rootData;
  if (isDataInCorrectFormat(data)) {
    rootData = data;
  } else {
    rootData = {
      name: `${options.label}`,
      children: data,
    };
  }

  // Prepare the data for the chart
  const root = d3
    .hierarchy(rootData)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  // Create the bubble layout
  const bubbleLayout = d3
    .pack()
    .size([diameter, diameter])
    .padding(options.padding); // Increase padding to prevent overlap

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
    .style('fill', (d) => colorScheme[d.depth])
    .style('opacity', (d) => (d.depth <= 1 ? 1 : options.opacity));

  // // Add labels to the bubbles
  // nodes
  //   .append('text')
  //   .attr('dy', '.3em')
  //   .style('text-anchor', `${options.textAnchor}`)
  //   .style('font-size', (d) => (d.depth === 1 ? `${options.parentTextSize}` : `${options.childTextSize}`))
  //   .style('fill', `${options.fontColor}`) // Set the text color explicitly
  //   .text((d) => {
  //     if (d.depth === 0) {
  //       return d.data.name;
  //     }
  //     return d.data.name;
  //   })
  //   .attr('x', 0) // Center the text horizontally
  //   .attr('y', (d) => (d.depth === 1 ? -options.height / 6 : 0)); // Adjust the text placement
  nodes
    .append('text')
    .attr('dy', '.3em')
    .style('text-anchor', `${options.textAnchor}`)
    .style('font-size', (d) => {
      console.log('===', d);
      if (d.depth === 0) {
        return (`${options.parentTextSize}` * 2); // Specify a rootTextSize in options for the root node text size
      }
      if (d.depth === 1) {
        return `${options.parentTextSize}`;
      }

      return `${options.childTextSize}`;
    })
    .style('fill', `${options.fontColor}`) // Set the text color explicitly
    .text((d) => d.data.name)
    .attr('x', 0) // Center the text horizontally
    .attr('y', (d) => {
      if (d.depth === 0) {
        return -options.height / 3.5; // Adjust position for the root node text
      }
      if (d.depth === 1) {
        return -options.height / 6;
      }

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
