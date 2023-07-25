export default function createAdjacencyMatrix(unformattedData, options, chartComponents) {
  const { svg, x, y } = chartComponents;
  console.log(y, 'x and y');
  console.log(x, 'x and y');

  function convertToAdjacencyList(unformattedData) {
    const nodes = unformattedData.map((d) => ({ id: d.category }));
    const links = [];

    unformattedData.forEach((d) => {
      d.children.forEach((child) => {
        links.push({
          source: d.category,
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
    .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`);

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.links.map((d) => d.value))])
    .range([options.minColor, options.maxColor]);

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
