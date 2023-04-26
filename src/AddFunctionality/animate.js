// export default function addAnimation(selector, data, options) {
//   function customSort(criteria) {
//     return (a, b) => {
//       switch (criteria) {
//         case 'x':
//           return (a.x !== undefined && b.x !== undefined) ? a.x - b.x : a.label.localeCompare(b.label);
//         case 'y':
//           return (a.y !== undefined && b.y !== undefined) ? a.y - b.y : a.value - b.value;
//         case 'value':
//           return a.value - b.value;
//         default:
//           throw new Error('Invalid sorting criteria');
//       }
//     };
//   }

//   // Sort the data based on the custom sort function
//   const sortedData = data.slice().sort(customSort(options.sortBy || 'value'));

//   // Hide the data points by setting their opacity to 0
//   d3.select(selector)
//     .select('.data-points') // Select the container with the class 'data-points'
//     .selectAll('path') // Select only the path elements within the container
//     .style('opacity', 0);

// // Animate the data points to appear one by one
// d3.select(selector)
//     // .select('.data-points') // Select the container with the class 'data-points'
//     .selectAll('path') // Select only the path elements within the container
//     .data(sortedData)
//     .transition()
//     .duration(options.animationDuration || 200)
//     .delay((_, i) => (options.animationDelay || 100) * i)
//     .style('opacity', 1);

// }
// import * as d3 from "d3";

// export default function animateByYValue(selector, data, options, duration = 1000) {
//   options.forEach((option, i) => {
//     const elements = d3.selectAll(
//       `circle.${option.chartClass}${i}, rect.${option.chartClass}${i}, .node.${option.chartClass}${i}, .leaf.${option.chartClass}${i}, .link.${option.chartClass}${i}, .box-rect, .arc, path.${option.chartClass}${i}, svg.pie-chart path`
//     );
//     console.log('elements here---------', elements, options.chartClass);

//     // Get an array of the elements' data
//     // const data = elements.data();
//     console.log('UNsorted data here---------', data);

//     // Sort the data by y-value
//     data.sort((a, b) => d3.ascending(a.y, b.y));
//     console.log('sorted data here---------', data);

//     // Bind the sorted data to the elements
//     const updatedElements = elements.data(data);

//     // Animate the elements by updating their position based on the sorted data
//     updatedElements
//       .transition()
//       .duration(duration)
//       .attr("transform", (d, i) => {
//         return `translate(${d.x},${d.y})`;
//       });
//   });
// }
// import * as d3 from "d3";

// export default function animateBarChartSort(selector, data, xScale, xAxis, duration = 1000) {
//   // Sort the data by value in ascending order
//   const sortedData = data.slice().sort((a, b) => d3.ascending(a.y, b.y));

//   // Update the xScale's domain with the sorted data's keys
//   xScale.domain(sortedData.map((d) => d.key));

//   // Select the chart and bars
//   const chart = d3.select(selector);
//   const bars = chart.selectAll("rect");

//   // Animate the bars' x position based on the sorted xScale
//   bars.data(sortedData)
//     .transition()
//     .duration(duration)
//     .attr("x", (d) => xScale(d.key));

//   // Animate the x-axis to reflect the new domain
//   chart.select(".x-axis")
//     .transition()
//     .duration(duration)
//     .call(xAxis);
// }
// import * as d3 from "d3";

// export default function animateBarChartSort(selector, data, xScale, xAxis, duration = 1000) {
//   const chart = d3.select(selector);

//   // Sort the data by value in ascending order
//   const sortedData = data.slice().sort((a, b) => d3.ascending(a.value, b.value));

//   // Update the xScale's domain with the sorted data's keys
//   xScale.domain(sortedData.map((d) => d.key));

//   // Animate the x-axis to reflect the new domain
//   chart.select(".x-axis")
//     .transition()
//     .duration(duration)
//     .call(xAxis);

//   // Update the bars and bar labels with the sorted data
//   const bars = chart.selectAll(".bar").data(sortedData);
//   // const barLabels = chart.selectAll(".bar-label").data(sortedData);

//   // Animate the bars' x position based on the sorted xScale and index
//   bars.transition()
//     .duration(duration)
//     .attr("x", (d, i) => xScale(d.key));

//   // Animate the bar labels' x position based on the sorted xScale and index
//   // barLabels.transition()
//   //   .duration(duration)
//   //   .attr("x", (d, i) => xScale(d.key) + xScale.bandwidth() / 2);
// }
import * as d3 from 'd3';

export default function addAnimation(selector, chart2Function, data, options, generalElements, duration = 1000) {
  // does not work if xLine or yLine are true after initial chart
  // Wait for the specified duration before transitioning to the second chart
  setTimeout(() => {
    // Get the new data and updated scales from the second chart function
    const chart = d3.select(selector);

    // Update the x-axis and y-axis with new scales and animate the transition
    chart.select('.x-axis')
      .transition()
      .duration(duration)
      .call(generalElements.xAxis);

    chart.select('.y-axis')
      .transition()
      .duration(duration)
      .call(generalElements.yAxis);

    // Update the chart elements with new data and animate the transition
    const chartElements = chart.selectAll('g rect, g circle, .line-graph0');
    chartElements.data(data);

    console.log('chartElements here---------', chartElements);
    const line = d3.line()
      .x((d) => generalElements.x(d.x))
      .y((d) => generalElements.y(d.y));

    const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));

    // chartElements
    //   .data(data)
    //   .join(
    //     (enter) => enter.append('circle'),
    //     (update) => update,
    //     (exit) => exit.remove()
    //   )
    //   .transition()
    //   .duration(duration)
    //   .attr('x', (d, i, nodes) => {
    //     if (nodes[i].nodeName === 'rect') {
    //       return generalElements.x(d.x);
    //     }
    //   })
    //   .attr('y', (d, i, nodes) => {
    //     if (nodes[i].nodeName === 'rect') {
    //       return generalElements.y(d.y);
    //     }
    //   })
    //   .attr('height', (d, i, nodes) => {
    //     if (nodes[i].nodeName === 'rect') {
    //       return generalElements.y(0) - generalElements.y(d.y);
    //     }
    //   })
    //   .attr('cx', (d, i, nodes) => {
    //     if (nodes[i].nodeName === 'circle') {
    //       return generalElements.x(d.x);
    //     }
    //   })
    //   .attr('cy', (d, i, nodes) => {
    //     if (nodes[i].nodeName === 'circle') {
    //       return generalElements.y(d.y);
    //     }
    //   })
    //   .attr('d', (d, i, nodes) => {
    //     if (nodes[i].nodeName === 'path') {
    //       return line(sortedData);
    //     }
    //   });

    chartElements
      .data(data)
      // .join(
      //   (enter) => enter.append('circle'),
      //   (update) => update,
      //   (exit) => exit.remove()
      // )
      .transition()
      .duration(duration)
      .attr('x', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          return generalElements.x(d.x);
        }
      })
      .attr('y', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          return generalElements.y(d.y);
        }
      })
      .attr('height', (d, i, nodes) => {
        if (nodes[i].nodeName === 'rect') {
          return generalElements.y(0) - generalElements.y(d.y);
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

    // // Optionally, you can also update the attributes (e.g., width, height, radius, etc.) of the elements
    // based on the element type (rect, circle, etc.) and the chart type (bar chart, line chart, etc.)
  }, duration);
}
