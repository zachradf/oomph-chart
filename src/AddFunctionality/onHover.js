import * as d3 from 'd3';

export default function onHover(selector, options) {
  console.log(selector);
  console.log(options);
  options.forEach((option, i) => {
    console.log(option.chartClass);

    // Select all the elements (rect, node, leaf, link, circle) with the specified chartType class
    const elements = d3.selectAll(`circle.${option.chartClass}${i}, rect.${option.chartClass}${i}, .node.${option.chartClass}${i}, .leaf.${option.chartClass}${i}, .link.${option.chartClass}${i}, .box-rect, .arc, path.${option.chartClass}${i}, svg.pie-chart path`);
    // console.log('))))))))))))))))))))))))))', elements);
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid black')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('pointer-events', 'none')
      .style('display', 'none');

    elements.each(function () {
      console.log(option.onHover);
      console.log(this)
      if (option.onHover) {
        console.log('each element', this);
        const el = d3.select(this);
        // Store the initial fill style value in a custom data attribute
        el.attr('data-initialFill', el.style('fill'))
          .on('mouseover', function () {
            if (option.onHover) {
              console.log('hovering');
              const el = d3.select(this);
              const initialFill = el.attr('data-initialFill');
              const fillColor = d3.color(initialFill);
              // Update tooltip content and position
              tooltip.html(`Data: ${JSON.stringify(el.datum())}`)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY + 10}px`)
                .style('display', 'block');

              // Set the fill style to the desired hover color or 4 shades darker than the initial fill color
              el.style('fill', option.hoverColor || fillColor.darker(4));
            }
          })
          .on('mouseout', function () {
          // Restore the fill style to the initial fill value
            const initialFill = d3.select(this).attr('data-initialFill');
            d3.select(this).style('fill', initialFill);
            // Hide the tooltip
            tooltip.style('display', 'none');
          });
      }
    });
  });
}
