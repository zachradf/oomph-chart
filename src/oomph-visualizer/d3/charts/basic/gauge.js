// export default function createD3GaugeChart(sampleValues, selector, options) {
//   const width = options.width || 300;
//   const height = options.height || 300;
//   const minValue = options.minValue || 0;
//   const maxValue = options.maxValue || 100;
//   const majorTicks = options.majorTicks || 5;
//   const minorTicks = options.minorTicks || 2;
//   const transitionDuration = options.transitionDuration || 750;
//   const transitionDelay = options.transitionDelay || 0;

//   const radius = Math.min(width, height) / 2;

//   const range = maxValue - minValue;
//   const majorTickStep = range / majorTicks;
//   const minorTickStep = majorTickStep / minorTicks;

//   const svg = d3.select(selector).append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .append('g')
//     .attr('transform', `translate(${width / 2},${height / 2})`);

//   const arc = d3.arc()
//     .innerRadius(0.65 * radius)
//     .outerRadius(0.85 * radius)
//     .startAngle((d, i) => i * Math.PI / majorTicks - Math.PI / 2)
//     .endAngle((d, i) => (i + 1) * Math.PI / majorTicks - Math.PI / 2);

//   // Major ticks
//   svg.selectAll('.majorTicks')
//     .data(d3.range(majorTicks))
//     .enter().append('path')
//     .attr('class', 'majorTicks')
//     .attr('fill', '#ccc')
//     .attr('d', arc);

//   // Minor ticks
//   svg.selectAll('.minorTicks')
//     .data(d3.range(majorTicks * minorTicks))
//     .enter().append('path')
//     .attr('class', 'minorTicks')
//     .attr('fill', '#999')
//     .attr('d', arc.innerRadius(0.75 * radius).outerRadius(0.85 * radius));

//   // Gauge pointer
//   const pointer = svg.append('path')
//     .attr('class', 'pointer')
//     .attr('fill', '#4684ee')
//     .attr('stroke', 'black')
//     .attr('stroke-width', '1px');

//   function update(sampleValue) {
//     const ratio = Math.min(Math.max((sampleValue - minValue) / range, 0), 1);
//     const angle = ratio * Math.PI - Math.PI / 2;

//     const pointerPath = d3.lineRadial()
//       .angle(() => angle)
//       .radius((d, i) => (i % 2 === 0 ? 0.6 * radius : radius));

//     pointer.datum([0, 1])
//       .transition()
//       .duration(transitionDuration)
//       .delay(transitionDelay)
//       .attr('d', pointerPath);
//   }

//   if (Array.isArray(sampleValues)) {
//     sampleValues.forEach((value, index) => {
//       setTimeout(() => update(value), index * transitionDuration);
//     });
//   } else {
//     update(sampleValues);
//   }
// }

// CODE ABOVE HAS BETTER TRANSITION, try to merge
export default function createD3GaugeChart(sampleValues, options, generalElements) {
  const width = options.width || 300;
  const height = options.height || 300;
  const radius = Math.min(width, height) / 2;
  const startAngle = options.startAngle || -Math.PI / 1.25;
  const endAngle = options.endAngle || Math.PI / 1.25;
  const majorTicks = options.majorTicks || 5;
  const minorTicks = options.minorTicks || 4;
  const majorTickColor = options.majorTickColor || 'black';
  const minorTickColor = options.minorTickColor || 'black';
  const pointerColor = options.pointerColor || 'red';
  const arcColors = options.arcColors || d3.schemeCategory10;
  const { svg } = generalElements;

  let currentValue = 0;

  const arc = d3.arc()
    .innerRadius(0.7 * radius)
    .outerRadius(0.85 * radius)
    .startAngle((d, i) => startAngle + i * (endAngle - startAngle) / majorTicks)
    .endAngle((d, i) => startAngle + (i + 1) * (endAngle - startAngle) / majorTicks);

  const minorTickValue = (endAngle - startAngle) / (majorTicks * minorTicks);
  const minorTickAngle = minorTickValue;

  // Major ticks
  svg.selectAll('.majorTicks')
    .data(d3.range(majorTicks))
    .enter().append('path')
    .attr('class', 'majorTicks')
    .attr('fill', majorTickColor)
    .attr('d', arc);

  // Minor ticks
  svg.selectAll('.minorTicks')
    .data(d3.range(majorTicks * minorTicks))
    .enter().append('path')
    .attr('class', 'minorTicks')
    .attr('fill', minorTickColor)
    .attr('d', arc.innerRadius(0.75 * radius).outerRadius(0.85 * radius));

  // Minor tick values
  svg.selectAll('.minorTickValues')
    .data(d3.range(majorTicks * minorTicks))
    .enter().append('text')
    .attr('class', 'minorTickValues')
    .attr('fill', minorTickColor)
    .attr('text-anchor', `${options.textAnchor}`)
    .attr('font-size', `${options.childTextSize}`)
    .attr('x', (d, i) => {
      const tickValueAngle = startAngle + i * minorTickAngle;
      return 0.68 * radius * Math.cos(tickValueAngle - Math.PI / 2);
    })
    .attr('y', (d, i) => {
      const tickValueAngle = startAngle + i * minorTickAngle;
      return 0.68 * radius * Math.sin(tickValueAngle - Math.PI / 2) + 4;
    })
    .text((d, i) => Number.parseFloat(i * minorTickValue).toFixed(1));

  // Gauge pointer
  const pointer = svg.append('path')
    .attr('class', 'pointer')
    .attr('fill', pointerColor)
    .attr('stroke', 'black')
    .attr('stroke-width', '1px');

  function updateGauge(value) {
    const angle = startAngle + (endAngle - startAngle) * value / (majorTicks * minorTicks);
    const pointerPath = d3.arc()
      .innerRadius(0.6 * radius)
      .outerRadius(0.9 * radius)
      .startAngle(angle - 0.05)
      .endAngle(angle + 0.05);

    pointer.transition()
      .duration(1000) // Change the duration to control the speed of the transition
      .attrTween('d', () => {
        const currentAngle = startAngle + (endAngle - startAngle) * currentValue / (majorTicks * minorTicks);
        const interpolate = d3.interpolate(currentAngle, angle);
        return (t) => {
          const interpolatedAngle = interpolate(t);
          const updatedPointerPath = d3.arc()
            .innerRadius(0.6 * radius)
            .outerRadius(0.9 * radius)
            .startAngle(interpolatedAngle - 0.05)
            .endAngle(interpolatedAngle + 0.05);
          return updatedPointerPath();
        };
      });

    currentValue = value;
  }

  // Update the gauge with the provided sampleValues
  if (Array.isArray(sampleValues)) {
    let index = 0;
    setInterval(() => {
      updateGauge(sampleValues[index]);
      index = (index + 1) % sampleValues.length;
    }, options.interval || 1000);
  } else {
    updateGauge(sampleValues);
  }
}
