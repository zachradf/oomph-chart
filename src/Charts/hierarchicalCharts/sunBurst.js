// TODO fix labels/titles
export default function createD3SunburstChart(data, selector, options) {
  // Set default options if not provided
  const colorScheme = options.colorScheme || d3.schemeCategory10;
  const {
    width, height, margin, radius,
  } = options;

  // Create a color scale
  const color = d3.scaleOrdinal(colorScheme);

  // Create a partition layout
  const partition = (data) => {
    const root = d3.hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])(root);
  };

  // Create an arc generator
  const arc = d3.arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  // Create the SVG container
  const svg = d3.select(selector)
    .append('svg')
    .classed('sun-burst', true)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `${-radius - margin.top} ${-radius - margin.bottom} ${width + margin.left * 2} ${height + margin.right * 2}`)//make sure you are assigning the right margin directions
    .style('font', '10px sans-serif');

  // Append a group element for the sunburst chart and center it within the SVG container
  const g = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // Generate sunburst chart using the partition layout and arc generator
  g.selectAll('path')
    .data(partition(data).descendants())
    .enter().append('path')
    .attr('fill', (d) => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr('fill-opacity', (d) => (d.children ? 0.6 : 0.4))
    .attr('d', arc)
    .append('title')
    .attr('font-size', '10px')
    .attr('font-family', 'sans-serif')
    .attr('color', 'white')
    .text((d) => `${d.ancestors().map((d) => d.data.name).reverse().join('/')}\n${d.value}`);
}
