export default function createAdjacencyMatrix(unformattedData, options, chartComponents) {
  const { svg, x, y } = chartComponents;
  const { margin: { left, top }, minColor, maxColor } = options;

  function convertToAdjacencyList(unformattedData) {
    const nodes = unformattedData.map((d) => ({ id: d.name }));
    const links = [];

    unformattedData.forEach((d) => {
      d.children.forEach((child) => {
        links.push({
          source: d.name,
          target: child.name,
          value: child.value,
        });
      });
    });
    console.log({ nodes, links });
    return { nodes, links };
  }
  const data = convertToAdjacencyList(unformattedData);
  const g = svg
    .append('g')
    .attr('transform', `translate(${left}, ${top})`);

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.links.map((d) => d.value))])
    .range([minColor, maxColor]);

  g.selectAll('rect')
    .data(data.links)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.source))
    .attr('y', (d) => y(d.target))
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('fill', (d) => colorScale(d.value));
}
