export default function createD3SunburstChart(data, options, chartComponents) {
  const {
    width, height, radius, childTextSize, label, colorScheme,
  } = options;
  // If the data is an array, wrap it into an extra root level.
  if (Array.isArray(data)) {
    data = { name: `${label}`, children: data };
  }
  const root = d3.hierarchy(processData(data))
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
  const nonLeafNames = [...new Set(root.descendants().map((d) => (d.children ? d.data.name : '')))];

  const color = d3.scaleOrdinal()
    .domain(nonLeafNames)
    .range(colorScheme);

  const { svg } = chartComponents;

  // This function is used to process the data structure.
  function processData(d) {
    if (d.children) {
      return {
        name: d.name,
        children: d.children.map(processData),
      };
    }
    return {
      name: d.name,
      value: d.value,
    };
  }
  // const root = d3.hierarchy(processData(data))
  // .sum((d) => d.value)
  // .sort((a, b) => b.value - a.value);
  const partition = (data) => d3.partition()
    .size([2 * Math.PI, root.height + 1])(root);

  const arc = d3.arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const nodes = g.selectAll('path')
    .data(partition(data).descendants())
    .enter().append('path')
    .attr('fill', (d) => (d.children ? color(d.data.name) : color(d.parent.data.name))) // use node's name as index to color scale if it has children, else use parent's name
    .attr('fill-opacity', (d) => (d.children ? 0.6 : 0.4))
    .attr('d', arc);

  function labelVisible(d) {
    return (d.x1 > d.x0 + 0.01);
  }

  g.selectAll('text')
    .data(partition(data).descendants())
    .enter().append('text')
    .attr('transform', (d) => {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x <= 90 || x >= 270 ? 0 : 180})`;
    })
    .attr('text-anchor', (d) => ((((d.x0 + d.x1) / 2) * 180) / Math.PI < 180 ? 'start' : 'end'))
    .attr('dy', '0.35em')
    .attr('font-size', childTextSize)
    .text((d) => d.data.name)
    .attr('fill-opacity', (d) => +labelVisible(d))
    .attr('display', (d) => (labelVisible(d) ? null : 'none'));
}
