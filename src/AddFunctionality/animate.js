// import * as d3 from 'd3';

// export default function addAnimation(selector, chart2Function, data, options, generalElements, duration = 1000) {
//   // does not work if xLine or yLine are true after initial chart
//   // Wait for the specified duration before transitioning to the second chart
//   setTimeout(() => {
//     // Get the new data and updated scales from the second chart function
//     const chart = d3.select(selector);

//     // Update the x-axis and y-axis with new scales and animate the transition
//     chart.select('.x-axis')
//       .transition()
//       .duration(duration)
//       .call(generalElements.xAxis);

//     chart.select('.y-axis')
//       .transition()
//       .duration(duration)
//       .call(generalElements.yAxis);

//     // Update the chart elements with new data and animate the transition
//     const chartElements = chart.selectAll('g rect, g circle, .line-graph0');
//     // chartElements.data(data);
//     const boundElements = chartElements.data(data);

//     console.log('chartElements here---------', chartElements.attr('class'));
//     const line = d3.line()
//       .x((d) => generalElements.x(d.x))
//       .y((d) => generalElements.y(d.y));

//     const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));
//     const type = chartElements.attr('class');
//     console.log('type', type);

//     chartElements
//       .data(data)
//       .join(
//         (enter) => enter.append((d, i, nodes) => {
//           console.log('nodes[i].nodeName', nodes);
//           switch (type) {
//             case 'bar-chart0':
//               return document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//             case 'scatter-plot0':
//               return document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//             case 'line-graph0':
//               return document.createElementNS('http://www.w3.org/2000/svg', 'path');
//             default:
//               return null;
//           }
//         })
//       )
//       .transition()
//       .duration(duration)
//       .attr('x', (d, i, nodes) => {
//         if (nodes[i].nodeName === 'rect') {
//           console.log(nodes[i].nodeName)
//           return generalElements.x(d.x);
//         }
//       })
//       .attr('y', (d, i, nodes) => {
//         if (nodes[i].nodeName === 'rect') {
//           return generalElements.y(d.y);
//         }
//       })
//       .attr('height', (d, i, nodes) => {
//         if (nodes[i].nodeName === 'rect') {
//           return generalElements.y(0) - generalElements.y(d.y);
//         }
//       })
//       .attr('cx', (d, i, nodes) => {
//         if (nodes[i].nodeName === 'circle') {
//           return generalElements.x(d.x);
//         }
//       })
//       .attr('cy', (d, i, nodes) => {
//         if (nodes[i].nodeName === 'circle') {
//           return generalElements.y(d.y);
//         }
//       })
//       .attr('d', (d, i, nodes) => {
//         if (nodes[i].nodeName === 'path') {
//           return line(sortedData);
//         }
//       });

//     // // Optionally, you can also update the attributes (e.g., width, height, radius, etc.) of the elements
//     // based on the element type (rect, circle, etc.) and the chart type (bar chart, line chart, etc.)
//   }, duration);
// }

import onHover from "./onHover";
export default function addAnimation(selector, chart2Function, data, options, generalElements, duration = 1000) {
  setTimeout(() => {
    const chart = d3.select(selector);
    console.log('chart', chart);

    chart.select('.x-axis')
      .transition()
      .duration(duration)
      .call(generalElements.xAxis);

    chart.select('.y-axis')
      .transition()
      .duration(duration)
      .call(generalElements.yAxis);

    let chartElements = chart.selectAll('g rect, g circle, .line-graph0');
    if (chartElements.nodes()[0].nodeName === 'rect') {
      data = data.sort((a, b) => d3.ascending(a.x, b.x));
    }
    // Calculate the difference between the length of the new dataset and the number of elements in the initial chart
    let numPlaceholders = data.length - chartElements.size();
    console.log('numPlaceholders', generalElements.xAxis);
    if (numPlaceholders > 0) {
      while (numPlaceholders > 0) {
        const selectedElement = chartElements.nodes()[0];
        // Clone the element
        const clonedElement = selectedElement.cloneNode(true);

        // Append the cloned element to the chart
        const g = chart.select('g');

        // Append the cloned element to the g group
        g.node().appendChild(clonedElement);
        numPlaceholders -= 1;
      }
    } else if (numPlaceholders < 0) {
      const nodes = chartElements.nodes();
      while (numPlaceholders < 0) {
        const selectedElement = nodes.pop();
        // Remove the selected element from the chart
        selectedElement.remove();
        numPlaceholders += 1;
      }
    }
    chartElements = chart.selectAll('g rect, g circle, .line-graph0').data(data);

    // Create an array of placeholder elements
    const placeholders = new Array(numPlaceholders).fill(null).map(() => document.createElementNS('http://www.w3.org/2000/svg', `${chartElements.nodes()[0].nodeName}`));

    // Merge the chartElements and placeholders arrays
    const mergedSelection = d3.selectAll([...chartElements.nodes(), ...placeholders]);

    // Bind the new data array to the merged selection
    const updateSelection = mergedSelection.data(data);
    const line = d3.line()
      .x((d) => generalElements.x(d.x))
      .y((d) => generalElements.y(d.y));

    const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));
    console.log('sortedData', sortedData);
    const type = chartElements.attr('class');

    const enterSelection = updateSelection.enter();
    const exitSelection = updateSelection.exit();

    // Enter selection
    enterSelection
      .append((d, i, nodes) => {
        switch (type) {
          case 'bar-chart0':
            return document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          case 'scatter-plot0':
            return document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          case 'line-graph0':
            return document.createElementNS('http://www.w3.org/2000/svg', 'path');
          default:
            return null;
        }
      })
      .attr('class', type)
      .attr('r', 5); // Set radius for new circle elements

    // Calculate dynamic bar width based on the number of data points
    // const dynamicBarWidth = 100

     const dynamicBarWidth = (options.width - options.margin.left - options.margin.right) / data.length - (options.width/data.length * 0.2);

    updateSelection
      .merge(enterSelection)
      .transition()
      .duration(duration)
      .attr('x', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          return generalElements.x(d.x) - dynamicBarWidth / 2;
        }
      })
      .attr('y', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          if (generalElements.y(0) - generalElements.y(d.y) < 0) {
            return 575;
          }
          return generalElements.y(d.y);
        }
      })
      .attr('height', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          if (generalElements.y(0) - generalElements.y(d.y) < 0) {
            return 5;
          }
          return generalElements.y(0) - generalElements.y(d.y);
        }
      })
      .attr('width', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          return dynamicBarWidth;
        }
      })
      .attr('cx', (d, i, nodes) => {
        if (nodes[i].nodeName === 'circle') {
          return generalElements.x(d.x);
        }
      })
      .attr('cy', (d, i, nodes) => {
        if (nodes[i].nodeName === 'circle') {
          return generalElements.y(d.y);
        }
      })
      .attr('d', (d, i, nodes) => {
        if (nodes[i].nodeName === 'path') {
          return line(sortedData);
        }
      });

    if (!options.yLine) {
      chart.select('.y-axis path').remove();
    }
    if (!options.xLine) {
      chart.select('.x-axis path').remove();
    }

    // Exit selection
    exitSelection.remove();

    if (options.onHover) {
      onHover(selector, [options]);
    }
  }, duration);
}
