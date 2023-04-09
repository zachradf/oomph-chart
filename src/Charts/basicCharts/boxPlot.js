export default function createD3BoxPlot(data, selector, options) {
  const margin = options.margin || {
    top: 10, right: 50, bottom: 20, left: 50,
  };
  const width = options.width || 600;
  const height = options.height || 400;
  const fillColor = options.fillColor || 'steelblue';

  const svg = d3.select(selector)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'box-plot');

  const x = d3.scaleBand()
    .range([margin.left, width - margin.right])
    .padding(0.5);

  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top]);

  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .attr('class', 'x-axis');

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .attr('class', 'y-axis');

  function update(data) {
    x.domain(data.map((d) => d.category));
    y.domain([d3.min(data, (d) => d.min), d3.max(data, (d) => d.max)]).nice();

    svg.selectAll('.x-axis')
      .call(d3.axisBottom(x));

    svg.selectAll('.y-axis')
      .call(d3.axisLeft(y));

    const boxWidth = Math.min(x.bandwidth(), 50);

    const box = svg.selectAll('.box')
      .data(data, (d) => d.category)
      .join('g')
      .attr('class', 'box')
      .attr('transform', (d) => `translate(${x(d.category)},0)`);

    box.selectAll('.min')
      .data((d) => [d])
      .join('line')
      .attr('class', 'min')
      .attr('x1', boxWidth / 2)
      .attr('x2', boxWidth / 2)
      .attr('y1', (d) => y(d.min))
      .attr('y2', (d) => y(d.q1))
      .attr('stroke', 'black');

    box.selectAll('.max')
      .data((d) => [d])
      .join('line')
      .attr('class', 'max')
      .attr('x1', boxWidth / 2)
      .attr('x2', boxWidth / 2)
      .attr('y1', (d) => y(d.q3))
      .attr('y2', (d) => y(d.max))
      .attr('stroke', 'black');

    box.selectAll('.box-rect')
      .data((d) => [d])
      .join('rect')
      .attr('class', 'box-rect')
      .attr('x', 0)
      .attr('width', boxWidth)
      .attr('y', (d) => y(d.q3))
      .attr('height', (d) => y(d.q1) - y(d.q3))
      .attr('fill', fillColor);
  }

  update(data);

  return { update };
}
