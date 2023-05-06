export default function addGradient(selector, type, chartElements, data, options) {
  const { gradientAxis } = options;
  let xAxisBBox;
  let yAxisBBox;
  let xScale;
  if (type !== 'donut' && type !== 'pie' && type !== 'polar' && type !== 'radar') {
    xAxisBBox = chartElements.xAxisBBox ? chartElements.xAxisBBox : null;
    yAxisBBox = chartElements.yAxisBBox ? chartElements.yAxisBBox : null;
    xScale = chartElements.x ? chartElements.x : null;
  }

  const color1 = options.gradientColor[0];
  const color2 = options.gradientColor[1];

  const svg = d3.select(selector).select('svg');

  let minValue;
  let maxValue;
  if (type === 'bar') {
    maxValue = d3.max(data, (d) => d.y);
    minValue = d3.min(data, (d) => d.y);
  } else {
    minValue = d3.min(data, (d) => d[gradientAxis]);
    maxValue = d3.max(data, (d) => d[gradientAxis]);
  }

  const valueAccessor = (d) => d[gradientAxis];

  // Create the gradient element
  const gradient = svg.append('linearGradient')
    .attr('id', 'gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 1);

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', color1);

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', color2);

  if (type === 'bar') {
    if (gradientAxis === 'y') {
      gradient.attr('y1', yAxisBBox.height)
        .attr('y2', 0);

      svg.selectAll('rect').style('fill', 'url(#gradient)');
    } else if (gradientAxis === 'x') {
      const colorScale = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([color1, color2]);
      const elements = d3.selectAll(`rect.${options.chartClass}${0}`);
      elements.style('fill', (d) => {
        colorScale(d.y);
      });
      d3.selectAll(`rect.${options.chartClass}${0}`).style('fill', (d) => colorScale(d.y));
    }
  } else if (type === 'scatter') {
    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('circle').style('fill', (d) => colorScale(valueAccessor(d)));
  } else if (type === 'pie' || type === 'polar') {
    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('path')
      .attr('fill', (d) => colorScale(d.data.y));
  } else if (type === 'donut') {
    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    svg.selectAll('path')
      .attr('fill', (d) => colorScale(d.data.y));
  } else if (type === 'area' || type === 'line') {
    const elements = svg.selectAll(`path.${options.chartClass}${0}`);

    const colorScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([color1, color2]);

    if (gradientAxis === 'x') {
      gradient
        .attr('x1', xAxisBBox.x)
        .attr('x2', xAxisBBox.width)
        .attr('y1', 0)
        .attr('y2', 0);
    } else { // y
      console.log('YAXIS---------------------', yAxisBBox.height, 'xAXIS', xAxisBBox.width);
      gradient
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', yAxisBBox.height)
        .attr('y2', 0);
    }
    if (type === 'area') {
      elements.style('fill', 'url(#gradient)');
    } else { // LINE
      const lineGradient = svg.append('linearGradient')
        .attr('id', 'line-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', gradientAxis === 'x' ? 0 : xAxisBBox.width)
        .attr('x2', gradientAxis === 'x' ? xAxisBBox.width : 0)
        .attr('y1', gradientAxis === 'y' ? 0 : yAxisBBox.height)
        .attr('y2', gradientAxis === 'y' ? yAxisBBox.height : 0);

      data.forEach((d, i, arr) => {
        if (i === arr.length - 1) {
          return;
        }
        const color = colorScale(d[gradientAxis]);
        const relativePosition = (xScale(d.x) - xScale.range()[0]) / (xScale.range()[1] - xScale.range()[0]);

        lineGradient.append('stop')
          .attr('offset', `${relativePosition * 100}%`)
          .attr('stop-color', color);
      });

      elements.style('stroke', 'url(#line-gradient)');
    }
  } else {
    throw new Error(`Unsupported chart type ${type}`);
  }
}
