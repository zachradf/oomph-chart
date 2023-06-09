export default function createWordCloud(data, options, chartComponents) {
  const { width, height, y2ForceStrength } = options;
  const fontSize = (d) => Math.sqrt(d.value) * 2;
  const { svg } = chartComponents;
  // Create a linear scale for the radius of the bubbles
  const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([0, options.maxRadius]);

  // Create the force simulation
  // const simulation = d3.forceSimulation(data)
  //   .force('charge', d3.forceManyBody().strength(options.chargeStrength))
  //   .force('center', d3.forceCenter(width / 2, height / 2))
  //   .force('collision', d3.forceCollide().radius((d) => radiusScale(d.value) + fontSize(d)))
  //   .force('y2Force', y2Force(y2ForceStrength)) // Use y2ForceStrength from options
  //   .on('tick', ticked);
  const clusterStrengthVal = 0.005;

  const simulation = d3.forceSimulation(data)
    .force('charge', d3.forceManyBody().strength(options.chargeStrength))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius((d) => radiusScale(d.value) + 1))
    .force('y2Force', y2Force(y2ForceStrength))
    .force('clusterForce', clusterForce(clusterStrengthVal, data))
    .on('tick', ticked);

  // Create color scales object
  const uniqueY2Values = Array.from(new Set(data.map((d) => d.y2)));

  const colorScales = {
    0.2: d3.interpolatePlasma,
    0.5: d3.interpolateViridis,
    0.8: d3.interpolateInferno,
  };

  // Create the bubbles if options.bubble is true
  if (options.bubble) {
    const nodes = svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', (d) => radiusScale(d.value))
      .style('fill', (d) => {
        // If y2 value exists, use the color scale for that group
        if (d.y2 !== undefined) {
          console.log('COLOR SCALES', colorScales[d.y2], 'VALUE', d.v);
          return colorScales[d.y2](d.value / 1000); // TODO make this dynamic
        }

        // If y2 value doesn't exist, use the default color scheme
        return d3.schemeCategory10[d.value % 10];
      })
      .style('opacity', options.bubbleOpacity);
  }

  // Create the labels
  const labels = svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('dy', '.35em')
    .style('text-anchor', 'middle')
    .style('font-size', (d) => `${fontSize(d)}px`)
    .style('fill', 'black')
    .text((d) => d.name);

  // Update the positions of the bubbles and labels on each tick
  // function ticked() {
  //   if (options.bubble) {
  //     svg.selectAll('circle')
  //       .attr('cx', (d) => d.x)
  //       .attr('cy', (d) => {
  //         console.log(d.y);
  //         return d.y;
  //       });
  //   }

  //   labels
  //     .attr('x', (d) => d.x)
  //     .attr('y', (d) => d.y);
  // }
  function ticked() {
    if (options.bubble) {
      svg.selectAll('circle')
        .attr('cx', (d) => Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), d.x)))
        .attr('cy', (d) => Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), d.y)));
    }

    labels
      .attr('x', (d) => Math.max(fontSize(d) / 2, Math.min(width - fontSize(d) / 2, d.x)))
      .attr('y', (d) => Math.max(fontSize(d) / 2, Math.min(height - fontSize(d) / 2, d.y)));
  }
  // Define the y2Force function
  function y2Force(strength) {
    return (alpha) => {
      data.forEach((d) => {
        if (d.y2 !== undefined) {
          const targetY = height * d.y2;
          d.vy += (targetY - d.value) * strength * alpha;
        }
      });
    };
  }
  function clusterForce(strength, data) {
    return (alpha) => {
      data.forEach((d) => {
        if (d.y2 !== undefined) {
          const targetBubbles = data.filter((bubble) => bubble.y2 === d.y2);
          targetBubbles.forEach((target) => {
            if (target !== d) {
              const dx = d.x - target.x;
              const dy = d.y - target.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const desiredDistance = (radiusScale(d.value) + radiusScale(target.value)) * strength;

              if (distance < desiredDistance) {
                const k = (distance - desiredDistance) / distance * alpha;
                d.vx -= dx * k;
                d.vy -= dy * k;
                target.vx += dx * k;
                target.vy += dy * k;
              }
            }
          });
        }
      });
    };
  }
}
function clusterForce(strength, data) {
  return (alpha) => {
    data.forEach((d) => {
      if (d.y2 !== undefined) {
        const targetBubbles = data.filter((bubble) => bubble.y2 === d.y2);
        targetBubbles.forEach((target) => {
          if (target !== d) {
            const dx = d.x - target.x;
            const dy = d.y - target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const desiredDistance = (radiusScale(d.value) + radiusScale(target.value)) * strength;

            if (distance < desiredDistance) {
              const k = (distance - desiredDistance) / distance * alpha;
              d.vx -= dx * k;
              d.vy -= dy * k;
              target.vx += dx * k;
              target.vy += dy * k;
            }
          }
        });
      }
    });
  };
}

// // UNDER CONSTRUCTION
// export default function createWordCloud(data, selector, options) {
//   const { width, height, y2ForceStrength } = options;
//   const svg = d3.select(selector).append('svg').attr('width', width).attr('height', height);
//   const fontSize = (d) => Math.sqrt(d.y) * 2;

//   // Create a linear scale for the radius of the bubbles
//   const radiusScale = d3.scaleSqrt()
//     .domain([0, d3.max(data, (d) => d.y)])
//     .range([0, options.maxRadius]);

//   // Create color scales object
//   const uniqueY2Values = Array.from(new Set(data.map((d) => d.y2)));

//   const colorScales = {};
//   const interpolators = [
//     d3.interpolateViridis,
//     d3.interpolateInferno,
//     d3.interpolateMagma,
//   ];

//   uniqueY2Values.forEach((y2Value, index) => {
//     colorScales[y2Value] = d3.scaleSequential(interpolators[index % interpolators.length])
//       .domain([0, d3.max(data.filter((item) => item.y2 === y2Value), (item) => item.y)]);
//   });
// //   setTimeout(() => {
//     // Create the force simulation
//       const simulation = d3.forceSimulation(data)
//         .force('charge', d3.forceManyBody().strength(options.chargeStrength))
//         .force('center', d3.forceCenter(width / 2, height / 2))
//         .force('collision', d3.forceCollide().radius((d) => radiusScale(d.y) + fontSize(d)))
//         .force('y2Force', y2Force(y2ForceStrength)) // Use y2ForceStrength from options
//         .on('tick', ticked);
//     // }, 1000);
//   // Create the bubbles if options.bubble is true
//   if (options.bubble) {
//     console.log('NORDSTWO', data.forEach((d) => {
//       console.log('RADIUS SCALE !', radiusScale(d.y) + fontSize(d));
//     }));
//     const nodes = svg
//       .selectAll('circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('r', (d) => {
//         console.log('RADIUS SCALE', radiusScale(d.y), 'DATA', d.y);
//         return radiusScale(d.y);
//       })
//       .style('fill', (d) => {
//         // If y2 value exists, use the color scale for that group
//         if (d.y2 !== undefined) {
//           return colorScales[d.y2](d.y);
//         }
//         // If y2 value doesn't exist, use the default color scheme
//         return d3.schemeCategory10[d.y % 10];
//       })
//       .style('opacity', options.bubbleOpacity);
//     console.log('NORDS', nodes);
//   }

//   // Create the labels
//   const labels = svg
//     .selectAll('text')
//     .data(data)
//     .enter()
//     .append('text')
//     .attr('dy', '.35em')
//     .style('text-anchor', 'middle')
//     .style('font-size', (d) => `${fontSize(d)}px`)
//     .style('fill', 'black')
//     .text((d) => d.x);

//   //   Update the positions of the bubbles and labels on each tick
//   function ticked() {
//     if (options.bubble) {
//       svg.selectAll('circle')
//         .attr('cx', (d) => d.x)
//         .attr('cy', (d) => d.y);
//     }

//     labels
//       .attr('x', (d) => d.x)
//       .attr('y', (d) => d.y);
//   }

//   // Define the y2Force function
//   function y2Force(strength) {
//     return (alpha) => {
//       data.forEach((d) => {
//         if (d.y2 !== undefined) {
//           const targetY = height * d.y2;
//           d.vy += (targetY - d.y) * strength * alpha;
//         }
//       });
//     };
//   }
// }
