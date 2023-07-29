export default function createWordCloud(unformattedData, options, chartComponents) {
  const { 
    width, 
    height, 
    colorScheme,
    y2ForceStrength, 
    maxRadius, 
    textAnchor, 
    fontColor, 
    bubble, 
    chargeStrength, 
    bubbleOpacity 
  } = options;
  const fontSize = (d) => Math.sqrt(d.value) * 2;
  const { svg } = chartComponents;
  const data = unformattedData.flatMap((d, i) => d.children.map(child => ({
    ...child, 
    y2: i / unformattedData.length,
    category: d.name
  })));
  // Create a linear scale for the radius of the bubbles
  const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([0, maxRadius]);
  const labels = svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('dy', '.35em')
    .style('text-anchor', `${textAnchor}`)
    .style('font-size', (d) => `${fontSize(d)}px`)
    .style('fill', `${fontColor}`)
    .text((d) => d.name);

  function ticked() {
    if (bubble) {
      svg.selectAll('circle')
        .attr('cx', (d) => Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), d.x)))
        .attr('cy', (d) => Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), d.y)));
    }

    // Update the positions of the existing labels during each tick
    labels
      .attr('x', (d) => Math.max(radiusScale(d.value), Math.min(width - radiusScale(d.value), d.x)))
      .attr('y', (d) => Math.max(radiusScale(d.value), Math.min(height - radiusScale(d.value), d.y)))
      .attr('dy', '0.3em'); // adjust the position along the y-axis
  }

  const clusterStrengthVal = 0.005;

  const simulation = d3.forceSimulation(data)
    .force('charge', d3.forceManyBody().strength(chargeStrength))
    .force('center', d3.forceCenter(width / 2, height / 2))
    // Increase the strength or radius here
    .force('collision',  d3.forceCollide().radius((d) => radiusScale(d.value) + 1).strength(1))
    .force('y2Force', y2Force(y2ForceStrength))
    .force('clusterForce', clusterForce(clusterStrengthVal, data))
    .on('tick', ticked);

  // Generate color scale dynamically
  // const categories = Array.from(new Set(data.map((d) => d.name)));
  // const colorScale = d3.scaleOrdinal()
  //   .domain(categories)
  //   .range(d3.schemeCategory10);

  // // Create the bubbles if options.bubble is true
  // if (bubble) {
  //   const nodes = svg
  //     .selectAll('circle')
  //     .data(data)
  //     .enter()
  //     .append('circle')
  //     .attr('r', (d) => radiusScale(d.value))
  //     .style('fill', (d) => colorScale(d.name)) // Use the color scale based on category
  //     .style('opacity', bubbleOpacity);
  // }
// Generate color scale dynamically
const categories = Array.from(new Set(data.map((d) => d.category)));
const colorScale = d3.scaleOrdinal()
  .domain(categories)
  .range(colorScheme);

// Create the bubbles if options.bubble is true
if (bubble) {
  const nodes = svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', (d) => radiusScale(d.value))
    .style('fill', (d) => colorScale(d.category)) // Use the color scale based on category
    .style('opacity', bubbleOpacity);
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
