// export default function animateLine(chartElements, data, chartComponents, duration) {
//   console.log('animateLine');
//   const line = d3.line()
//     .x((d) => chartComponents.x(d.x))
//     .y((d) => chartComponents.y(d.y));

//   const updateSelection = chartElements.data(data);
//   const exitSelection = updateSelection.exit();

//   // Select the existing path element using the class 'line0'
//   const linePath = chartElements.filter('.line0');

//   // Update the 'd' attribute of the existing path element
//   linePath
//     .data([data])
//     .transition()
//     .duration(duration)
//     .attr('d', line)
//     .attr('fill', 'none'); // Ensure the 'fill' attribute is set to 'none'

//   exitSelection.remove();
// }
export default function animateLine(chartElements, data, chartComponents, duration) {
  console.log('animateLine');
  const line = d3.line()
    .x((d) => chartComponents.x(d.x))
    .y((d) => chartComponents.y(d.y));

  const updateSelection = chartElements.data(data);
  const exitSelection = updateSelection.exit();

  //   // Select the existing path element using the class 'line0'
  const linePath = chartElements.filter('.line0');

  // Store the original attributes
  const originalAttributes = Array.from(linePath.node().attributes)
    .reduce((acc, attr) => {
      if (attr.name !== 'd') {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});

  // Apply the animation
  linePath
    .data([data])
    .transition()
    .duration(duration)
    .attr('d', line)
    .on('end', () => {
      // Restore the original attributes after the animation
      Object.entries(originalAttributes).forEach(([attrName, attrValue]) => {
        linePath.attr(attrName, attrValue);
      });
    });

  exitSelection.remove();
}
