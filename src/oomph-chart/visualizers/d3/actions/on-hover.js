export default function onHover(selector, options) {
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('background', 'rgba(0,0,0,0.6)')
    .style('color', '#fff')
    .style('padding', '5px 15px')
    .style('border', '1px solid black')
    .style('border-radius', '5px')
    .style('pointer-events', 'none')
    .style('z-index', '10')
    .style('display', 'none');

  options.forEach((option, i) => {
    const elements = d3.selectAll(`.${option.chartClass}${i}`);

    elements.each(function () {
      if (option.onHover) {
        const el = d3.select(this);
        el.attr('data-initialFill', el.style('fill'))
          .on('mouseover', handleMouseOver)
          .on('mousemove', handleMouseMove)
          .on('mouseout', handleMouseOut);
      }
    });
  });
  function handleMouseOver(d) {
    // const el = d3.select(this);
    const el = d3.select(this);
    const initialFill = el.attr('data-initialFill');
    // const fillColor = d3.color(initialFill);
    // const existingFill = el.attr('data-initialFill');
    // console.log('fills', el.attr('data-initialFill'), el.attr('fill'));

    // Only set the initial fill if it hasn't been set already
    if (!initialFill || initialFill === 'rgb(0, 0, 0)') {
      console.log('fills', el.attr('data-initialFill'), el.style('fill'));
      el.attr('data-initialFill', el.style('fill'));
    }
    const fillColor = d3.color(initialFill);

    tooltip.html(`Data: ${JSON.stringify(el.datum())}`)
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY + 10}px`)
      .style('display', 'block');

    el.style('fill', options.hoverColor || fillColor.darker(4));
  }

  function handleMouseMove() {
    tooltip
      .style('top', `${event.pageY - 10}px`)
      .style('left', `${event.pageX + 10}px`);
  }

  function handleMouseOut() {
    const initialFill = d3.select(this).attr('data-initialFill');
    d3.select(this).style('fill', initialFill);
    tooltip.style('display', 'none');
  }
}
